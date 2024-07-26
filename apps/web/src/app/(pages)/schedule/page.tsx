'use client'
import { useState } from 'react'
import { Professional, Service } from '@barber/core'
import { useSchedule } from '@/data/hooks/useAgendamento'
import { Summary } from '@/components/schedule/summary'
import { InputService } from '@/components/schedule/input-services'
import { InputProfessionals } from '@/components/schedule/input-professionals'
import { Steps } from '@/components/shared/steps'
import { InputDate } from '@/components/schedule/input-date'
import { Header } from '@/components/shared/header'

export default function SchedulePage() {
    const [permiteProximoPasso, setPermiteProximoPasso] = useState<boolean>(false)
    const {
       data,
       professional,
       services,
       quantitySlots,
       selecionarData,
       selecionarProfessional,
       selecionarServices

    } = useSchedule()

    function profissionalMudou(profissional: Professional) {
        selecionarProfessional(profissional)
        setPermiteProximoPasso(!!profissional)
    }

    function servicesMudou(services: Service[]) {
        selecionarServices(services)
        setPermiteProximoPasso(services.length > 0)
    }

    function dataMudou(data: Date) {
        selecionarData(data)

        const temData = data
        const horaValida = data.getHours() >= 8 && data.getHours() <= 21
        setPermiteProximoPasso(temData && horaValida)
    }

    return (
        <div className="flex flex-col bg-zinc-900">
            <Header
                title="Agendamento de Serviços"
                description="Seja atendido exatamente no horário marcado."
            />
            <div
                className="
                    container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10
                "
            >
                <Steps
                    permiteProximoPasso={permiteProximoPasso}
                    permiteProximoPassoMudou={setPermiteProximoPasso}
                    labels={[
                        'Selecione o profissional',
                        'Informe os serviços',
                        'Escolha o horário',
                    ]}
                >
                    <InputProfessionals
                        professional={professional}
                        professionalMudou={profissionalMudou}
                    />
                    <InputService services={services} servicesMudou={servicesMudou} />
                    <InputDate
                        data={data}
                        dataMudou={dataMudou}
                        quantidadeDeSlots={quantitySlots()}
                    />
                </Steps>
                <Summary />
            </div>
        </div>
    )
}
