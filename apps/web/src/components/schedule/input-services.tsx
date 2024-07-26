import { useServices } from '@/data/hooks/use-service'
import { Service } from '@barber/core'
import Image from 'next/image'

export interface ServicesInputProps {
    services: Service[]
    servicesMudou: (services: Service[]) => void
}

function Option(props: { service: Service; onClick: (s: Service) => void; selecionado?: boolean }) {
    return (
        <div
            className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden 
            ${props.selecionado ? 'border-green-400' : 'border-zinc-700'}`}
            onClick={() => props.onClick(props.service)}
        >
            <Image
                src={props.service.imageUrl}
                alt={props.service.name}
                width={150}
                height={120}
            />
            <div
                className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.selecionado ? 'text-black bg-green-400 font-semibold' : 'text-zinc-400 font-light bg-zinc-900 '}
                `}
            >
                {props.service.name}
            </div>
        </div>
    )
}

export function InputService(props: ServicesInputProps) {
    const { servicesMudou } = props
    const { service: allServices } = useServices()

    function toggleBookingService(service: Service) {
        const serviceSelecionado = props.services.find((s) => s.id === service.id)
        servicesMudou(
            serviceSelecionado
                ? props.services.filter((s) => s.id !== service.id)
                : [...props.services, service]
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">Serviços Disponíveis</span>
            <div className="grid grid-cols-3 self-start gap-5">
                {allServices.map((service:any) => (
                    <Option
                        key={service.id}
                        service={service}
                        onClick={toggleBookingService}
                        selecionado={props.services.some((serv) => serv.id === service.id)}
                    />
                ))}
            </div>
        </div>
    )
}
