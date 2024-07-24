import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react'

export interface AvailableProps {
    value: number
    quantity: number
}

export function Available(props: AvailableProps) {
    const { value: available, quantity } = props

    const estrelas = Array.from({ length: 5 }, (_, index) => {
        const value = index + 1
        if (available >= value) {
            return <IconStarFilled key={index} size={18} />
        }
        if (available + 1 > value) {
            return <IconStarHalfFilled key={index} size={18} />
        }
        return <IconStar key={index} size={18} />
    })

    return (
        <div className="flex items-end gap-2">
            <div className="flex items-center gap-1 text-yellow-400">{estrelas}</div>
            <div className="flex text-xs text-zinc-300">({quantity})</div>
        </div>
    )
}
