import { Schedule } from './schedule'

export interface ScheduleRepository {
    create(schedule: Schedule): Promise<void>
    findByEmail(email: string): Promise<Schedule[]>
    findByProfessional(professional: number, date: Date): Promise<Schedule[]>
}
