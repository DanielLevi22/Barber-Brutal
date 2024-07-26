import { TIME_SLOT } from '../constants'
import { ScheduleRepository} from './schedule-repository'

export  class FetchBusySchedules {
    constructor(private readonly repo: ScheduleRepository) {}

    async execute(professionalId: number, date: Date): Promise<string[]> {
        const appointments = await this.repo.findByProfessional(professionalId, date)
        const data = appointments
            .map((appointment) => {
                return {
                    date: appointment.date,
                    slots: appointment.services.reduce((total, s) => total + s.quantitySlots, 0),
                }
            })
            .reduce((busySchedules: Date[], data: any) => {
                const schedule = data.date
                const slots = data.slots
                const schedules = Array.from({ length: slots }, (_, i) =>
                    this.addMinutes(schedule, i * TIME_SLOT)
                )
                return [...busySchedules, ...schedules]
            }, [])
            .map((d) => d.toTimeString().slice(0, 5))

        return data // [ '10:00', '10:15', '10:30', '10:45', '14:15' ]
    }

    private addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000)
    }
}
