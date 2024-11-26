import { db } from '@Utils/DatabaseConnection.ts'
import { users } from '@Domain/Entity'
import { eq } from 'drizzle-orm'
import { userToCalendarPeriod } from '@Domain/Entity/UserToCalendarPeriod'

export const getCalendarPeriods = async (userId: number) => {
    return db
        .select()
        .from(userToCalendarPeriod)
        .where(eq(userToCalendarPeriod.user, userId))
        .execute()
}
