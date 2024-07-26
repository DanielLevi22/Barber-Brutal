import { InputDay} from './input-day'
import {InputHours} from './input-hours'

export interface DataInputProps {
    data: Date
    quantidadeDeSlots: number
    dataMudou: (data: Date) => void
}

export  function InputDate(props: DataInputProps) {
    const { data, quantidadeDeSlots, dataMudou } = props

    return (
        <div className="flex flex-col gap-10">
            <InputDay data={data} dataMudou={dataMudou} />
            <InputHours data={data} quantityHours={quantidadeDeSlots} dataMudou={dataMudou} />
        </div>
    )
}
