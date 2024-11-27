import { type CreateCalendarPeriod } from '@Domain/Entity/CalendarPeriod'
import { type CreatePeriodRelation, type User } from '@Domain/Entity'
import {
    getCalendarPeriods,
    saveCalendarPeriod,
    savePeriodRelation,
} from '@Repository/CalendarPeriod'

export const createCalendarPeriod = async (
    newPeriod: CreateCalendarPeriod,
    user: User
) => {
    const calendarPeriod = (await saveCalendarPeriod(newPeriod))[0].id
    const relation: CreatePeriodRelation = { calendarPeriod, user: user.id }
    await savePeriodRelation(relation)
}

export const getUserCalendarPeriods = async (user: User) => {
    return getCalendarPeriods(user.id)
}
