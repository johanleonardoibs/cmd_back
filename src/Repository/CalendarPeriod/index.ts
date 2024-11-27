import { db } from '@Utils/DatabaseConnection.ts'
import {
    calendarPeriod,
    type CreateCalendarPeriod,
    type CreatePeriodRelation,
} from '@Domain/Entity'
import { eq } from 'drizzle-orm'
import { userToCalendarPeriod } from '@Domain/Entity/UserToCalendarPeriod'

export const getCalendarPeriods = async (userId: number) => {
    const results = await db
        .select({
            period: calendarPeriod,
        })
        .from(userToCalendarPeriod)
        .innerJoin(
            calendarPeriod,
            eq(userToCalendarPeriod.calendarPeriod, calendarPeriod.id)
        )
        .where(eq(userToCalendarPeriod.user, userId))
        .execute()

    return results.map(({ period }) => period)
}

export const saveCalendarPeriod = async (newPeriod: CreateCalendarPeriod) => {
    return db
        .insert(calendarPeriod)
        .values(newPeriod)
        .returning({ id: calendarPeriod.id })
}

export const savePeriodRelation = async (newPeriod: CreatePeriodRelation) => {
    return db.insert(userToCalendarPeriod).values(newPeriod)
}
