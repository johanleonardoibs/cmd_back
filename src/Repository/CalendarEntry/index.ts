import {
    calendarEntries,
    type CalendarEntry,
    type CreateCalendarEntry,
    userToCalendarEntry,
} from '@Domain/Entity'
import { db } from '@Utils/DatabaseConnection.ts'
import { eq } from 'drizzle-orm'

export const getCalendarEntries = async (
    userId: number
): Promise<CalendarEntry[]> => {
    const results = await db
        .select({
            entry: calendarEntries,
        })
        .from(userToCalendarEntry)
        .innerJoin(
            calendarEntries,
            eq(userToCalendarEntry.calendarEntry, calendarEntries.id)
        )
        .where(eq(userToCalendarEntry.user, userId))
        .execute()

    return results.map(({ entry }) => entry)
}

export const saveCalendarEntry = (newEntry: CreateCalendarEntry) => {
    return db
        .insert(calendarEntries)
        .values(newEntry)
        .returning({ id: calendarEntries.id })
}

export const createEntryRelation = (calentarEntry: number, user: number) => {
    return db
        .insert(userToCalendarEntry)
        .values({
            calendarEntry: calentarEntry,
            user,
        })
        .returning({ id: userToCalendarEntry.id })
}
