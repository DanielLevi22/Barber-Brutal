import { createContext, useCallback, useEffect, useState } from 'react'
import { Professional, Service } from '@barber/core'
import { DataUtils } from '@barber/core'
import { useAuth } from '../hooks/use-User'
import {useAPI} from '../hooks/use-api'

interface ScheduleContextProps {
    professional: Professional | null
    services: Service[]
    data: Date
    occupiedTimes: string[]
    totalDuration(): string
    priceTotal(): number
    quantitySlots(): number
    selecionarProfessional(professional: Professional): void
    selecionarServices(services: Service[]): void
    selecionarData(data: Date): void
    schedule(): Promise<void>
}

export const ScheduleContext = createContext({} as ScheduleContextProps)

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
    const [professional, setProfessional] = useState<Professional | null>(null)
    const [services, setServices] = useState<Service[]>([])
    const [data, setData] = useState<Date>(DataUtils.today())

    const { user } = useAuth()
    const [occupiedTimes, setOccupiedTimes] = useState<string[]>([])
    const { httpGet, httpPost } = useAPI()

    function selecionarProfessional(professional: Professional) {
        setProfessional(professional)
    }

    function selecionarServices(services: Service[]) {
        setServices(services)
    }

    function totalDuration() {
        const duration = services.reduce((acc, atual) => {
            return (acc += atual.quantitySlots * 15)
        }, 0)

        return `${Math.trunc(duration / 60)}h ${duration % 60}m`
    }

    function priceTotal() {
        return services.reduce((acc, atual) => {
            return (acc += atual.price)
        }, 0)
    }

    const selecionarData = useCallback(function (hora: Date) {
        setData(hora)
    }, [])

    function quantitySlots() {
        const quantitySlots = services.reduce((acc, service) => {
            return (acc += service.quantitySlots)
        }, 0)

        return quantitySlots
    }

    async function schedule() {
        if (!user?.email) return

        await httpPost('schedules', {
            emailCliente: user.email,
            data: data!,
            professional: professional!,
            services: services,
        })

        clear()
    }

    function clear() {
        setData(DataUtils.today())
        setOccupiedTimes([])
        setProfessional(null)
        setServices([])
    }

    const obterOccupiedTimes = useCallback(
        async function (data: Date, professional: Professional): Promise<string[]> {
            try {
                if (!data || !professional) return []
                const dtString = data.toISOString().slice(0, 10)
                const schedule = await httpGet(
                    `agendamentos/schedule/${professional!.id}/${dtString}`
                )
                return schedule ?? []
            } catch (e) {
                return []
            }
        },
        [httpGet]
    )

    useEffect(() => {
        if (!data || !professional) return
        obterOccupiedTimes(data, professional).then(setOccupiedTimes)
    }, [data, professional, obterOccupiedTimes])

    return (
        <ScheduleContext.Provider
            value={{
                data,
                professional,
                services,
                occupiedTimes,
                totalDuration,
                priceTotal,
                selecionarData,
                selecionarProfessional,
                quantitySlots,
                selecionarServices,
                schedule,
            }}
        >
            {children}
        </ScheduleContext.Provider>
    )
}
