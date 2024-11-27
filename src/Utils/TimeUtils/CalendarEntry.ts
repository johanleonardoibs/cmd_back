import type { CalendarPeriod } from '@Domain/Entity'

export const isTimeWithinRange = (
    date: Date,
    durationMinutes: number,
    config: CalendarPeriod
): boolean => {
    const startDate = new Date(config.dateStart)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + config.weeks * 7)

    if (date < startDate || date >= endDate) {
        return false
    }

    const allowedDays = config.daysOfWeek.split(',').map(Number)
    const dayOfWeek = (date.getDay() + 6) % 7 // Ajustar para que 0 sea lunes y 6 sea domingo
    if (!allowedDays.includes(dayOfWeek)) {
        return false
    }

    const startTime = new Date(date)
    startTime.setHours(config.initialHour, 0, 0, 0)

    const endTime = new Date(startTime)
    endTime.setHours(startTime.getHours() + config.time)

    const eventEndTime = new Date(date)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + durationMinutes)

    return date >= startTime && eventEndTime <= endTime
}
