import {
    calendarEntry,
    calendarPeriod,
    type CreateCalendarEntry,
    userToCalendarEntry,
} from '@Domain/Entity'
import { db } from '@Utils/DatabaseConnection.ts'
import { eq } from 'drizzle-orm'

export const getCalendarEntries = async (userId: number) => {
    const results = await db
        .select({
            entry: calendarEntry,
        })
        .from(userToCalendarEntry)
        .innerJoin(
            calendarPeriod,
            eq(userToCalendarEntry.calendarEntry, calendarEntry.id)
        )
        .where(eq(userToCalendarEntry.user, userId))
        .execute()

    return results.map(({ entry }) => entry)
}

export const createCalendarEntry = (newEntry: CreateCalendarEntry) => {
    return db
        .insert(calendarEntry)
        .values(newEntry)
        .returning({ id: calendarEntry.id })
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
