import { type CreateCalendarEntry, type User } from '@Domain/Entity'
import {
    createCalendarEntry,
    createEntryRelation,
    getCalendarEntries,
} from '@Repository/CalendarEntry'

export const addCalendarEntry = async (
    user: User,
    newEntry: CreateCalendarEntry
) => {
    const calendarEntry = (
        await createCalendarEntry({
            ...newEntry,
            dateStart: new Date(newEntry.dateStart),
        })
    ).shift()?.id

    if (calendarEntry) {
        const created = (
            await createEntryRelation(calendarEntry, user.id)
        ).shift()?.id
        return !!created
    }

    return false
}

export const getUserCalendarEntries = async (user: User) => {
    return getCalendarEntries(user.id)
}
