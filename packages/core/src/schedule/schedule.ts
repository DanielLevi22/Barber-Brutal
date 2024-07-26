import { Professional } from '../professional'
import { Service } from '../service'

export  interface Schedule {
    id: number
    clientEmail: string
    date: Date
    professional: Professional
    services: Service[]
}
