import { useState } from 'react'
import { cn } from '@/lib/utils'
import { IconX } from '@tabler/icons-react'
import { ScheduleUtils, DataUtils } from '@barber/core'
import { useSchedule } from '@/data/hooks/useAgendamento'

export interface HoursInputProps {
    data: Date
    quantityHours: number
    dataMudou(data: Date): void
}

export  function InputHours(props: HoursInputProps) {
    const [horaHover, setHoraHover] = useState<string | null>(null)
    const { occupiedTimes } = useSchedule()
    const { manha, tarde, noite } = ScheduleUtils.timesOfTheDay()

    const horaSelecionada = props.data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    })

    function getPeriod(hour: string | null, quantity: number) {
        if (!hour) return []
        const hours = manha.includes(hour) ? manha : tarde.includes(hour) ? tarde : noite
        const index = hours.findIndex((h) => hour == h)
        return hours.slice(index, index + quantity)
    }

    function renderizarHour(hour: string) {
        const period = getPeriod(horaHover, props.quantityHours)
        const temHours = period.length === props.quantityHours
        const destacarHora = temHours && period.includes(hour)
        const periodSelect = getPeriod(horaSelecionada, props.quantityHours)
        const select =
            periodSelect.length === props.quantityHours && periodSelect.includes(hour)
        const nonSelect = !temHours && period.includes(hour)
        const periodBloqueado =
            period.includes(hour) && period.some((h) => occupiedTimes.includes(h))
        const ocupado = occupiedTimes.includes(hour)

        return (
            <div
                key={hour}
                className={cn(
                    'flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none',
                    {
                        'bg-yellow-400': destacarHora,
                        'bg-red-500': nonSelect || periodBloqueado,
                        'text-white bg-green-500': select,
                        'cursor-not-allowed bg-zinc-800': ocupado,
                    }
                )}
                onMouseEnter={(_) => setHoraHover(hour)}
                onMouseLeave={(_) => setHoraHover(null)}
                onClick={() => {
                    if (nonSelect) return
                    if (ocupado || periodBloqueado) return
                    props.dataMudou(DataUtils.setTime(props.data, hour))
                }}
            >
                <span
                    className={cn('text-sm text-zinc-400', {
                        'text-black font-semibold': destacarHora,
                        'text-white font-semibold': select,
                        'text-zinc-400 font-semibold': ocupado,
                    })}
                >
                    {nonSelect || periodBloqueado || ocupado ? (
                        <IconX size={18} className="text-white" />
                    ) : (
                        hour
                    )}
                </span>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">Horários Disponíveis</span>
            <div className="flex flex-col gap-3 select-none">
                <span className="text-xs uppercase text-zinc-400">Manhã</span>
                <div className="grid grid-cols-8 gap-1">{manha.map(renderizarHour)}</div>

                <span className="text-xs uppercase text-zinc-400">Tarde</span>
                <div className="grid grid-cols-8 gap-1">{tarde.map(renderizarHour)}</div>

                <span className="text-xs uppercase text-zinc-400">Noite</span>
                <div className="grid grid-cols-8 gap-1">{noite.map(renderizarHour)}</div>
            </div>
        </div>
    )
}
