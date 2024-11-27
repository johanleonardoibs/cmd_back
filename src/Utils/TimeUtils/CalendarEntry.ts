import type {
    CalendarEntry,
    CalendarPeriod,
    CreateCalendarEntry,
} from '@Domain/Entity'

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

export const hasCollision = (
    newEntry: CreateCalendarEntry,
    existingEntries: CalendarEntry[]
): boolean => {
    const newStart = new Date(newEntry.dateStart)
    const newEnd = new Date(newStart.getTime() + newEntry.time * 60000)

    return existingEntries.some((entry) => {
        const existingStart = new Date(entry.dateStart)
        const existingEnd = new Date(
            existingStart.getTime() + entry.time * 60000
        )

        const isTimeOverlap = newStart < existingEnd && newEnd > existingStart
        const isExactMatch =
            newStart.getTime() === existingStart.getTime() &&
            newEnd.getTime() === existingEnd.getTime()

        return isTimeOverlap || isExactMatch
    })
}
