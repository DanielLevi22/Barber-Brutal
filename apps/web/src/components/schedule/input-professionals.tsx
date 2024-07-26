import { useProfessionals } from '@/data/hooks/use-professional'
import { Professional } from '@barber/core'
import Image from 'next/image'

export interface ProfessionalInputProps {
    professional: Professional | null
    professionalMudou: (professional: Professional) => void
}

function Option(props: {
    professional: Professional
    onClick: (p: Professional) => void
    selecionado?: boolean
}) {
    return (
        <div
            className={`
                flex flex-col items-center cursor-pointer select-none rounded-lg border w-[150px] h-[180px]
                ${props.selecionado ? 'border-green-400' : 'border-zinc-700'} overflow-hidden
            `}
            onClick={() => props.onClick(props.professional)}
        >
            <Image
                src={props.professional.imageUrl}
                alt={props.professional.name}
                width={150}
                height={150}
                priority
            />
            <div
                className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.selecionado ? 'text-black bg-green-400 font-semibold' : 'text-zinc-400 font-light bg-zinc-900 '}
                `}
            >
                {props.professional.name.split(' ')[0]}
            </div>
        </div>
    )
}

export  function InputProfessionals(props: ProfessionalInputProps) {
    const { professionals } = useProfessionals()

    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">professionals Disponíveis</span>
            <div className="grid grid-cols-2 md:grid-cols-3 self-start gap-5">
                {professionals.map((professional) => (
                    <Option
                        key={professional.id}
                        professional={professional}
                        onClick={props.professionalMudou}
                        selecionado={professional.id === props.professional?.id}
                    />
                ))}
            </div>
        </div>
    )
}
