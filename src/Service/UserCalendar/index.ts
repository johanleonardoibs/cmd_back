import { type CreateCalendarPeriod } from '@Domain/Entity/CalendarPeriod'
import { getCalendarPeriods } from '@Repository/CalendaPeriod'
import { type User, users } from '@Domain/Entity'

export const createCalendarPeriod = async (
    newPeriod: CreateCalendarPeriod,
    user: User
) => {
    const userPeriods = await getCalendarPeriods(user.id)
    console.log(userPeriods)
}
