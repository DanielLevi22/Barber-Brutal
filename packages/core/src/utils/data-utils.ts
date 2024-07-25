export class DataUtils {
    static today() {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return today
    }

    // new Date(), '09:45'
    static setTime(data: Date, time: string): Date {
        const newDate = new Date(data)
        const partes = time.split(':')
        newDate.setHours(parseInt(partes[0]!), parseInt(partes[1]!))
        return newDate
    }
}
