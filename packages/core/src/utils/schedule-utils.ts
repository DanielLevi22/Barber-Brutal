export  class ScheduleUtils {
    private static minutes = [0, 15, 30, 45]

    static timesOfTheDay() {
        return {
            manha: this.generateTimes([8, 9, 10, 11]),
            tarde: this.generateTimes([14, 15, 16, 17]),
            noite: this.generateTimes([18, 19, 20, 21]),
        }
    }

    private static generateTimes(times: number[]) {
        return times.reduce((time, hora) => {
            const todos = this.minutes.map((minuto) => {
                return `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`
            })
            return time.concat(todos)
        }, [] as string[])
    }
}
