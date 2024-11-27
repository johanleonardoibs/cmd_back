import { type CreateCalendarEntry, type User } from '@Domain/Entity'
import {
    createEntryRelation,
    getCalendarEntries,
    saveCalendarEntry,
} from '@Repository'

export const addCalendarEntry = async (
    user: User,
    newEntry: CreateCalendarEntry
) => {
    const calendarEntry = (
        await saveCalendarEntry({
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
