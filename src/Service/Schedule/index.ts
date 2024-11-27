import {
    type CreateCalendarEntry,
    type CreateSchedulePost,
    EntryType,
} from '@Domain/Entity'
import {
    createEntryRelation,
    getCalendarEntries,
    getCalendarPeriods,
    getProcedure,
    getUserById,
    saveCalendarEntry,
    saveSchedule,
} from '@Repository'
import { hasCollision, isTimeWithinRange } from '@Utils/TimeUtils'

export const createSchedule = async (schedule: CreateSchedulePost) => {
    const medic = (await getUserById(schedule.medic)).shift()?.id
    const patient = (await getUserById(schedule.patient)).shift()?.id
    const procedure = (await getProcedure(schedule.procedure)).shift()

    if (medic && patient && procedure) {
        const medicPeriods = await getCalendarPeriods(medic)
        const medicCalendarEntries = await getCalendarEntries(patient)
        const patientCalendarEntries = await getCalendarEntries(patient)

        const calendarEntry: CreateCalendarEntry = {
            dateStart: new Date(schedule.date.dateStart),
            time: procedure.sessionDuration,
        }

        if (
            hasCollision(calendarEntry, medicCalendarEntries) ||
            hasCollision(calendarEntry, patientCalendarEntries)
        ) {
            return false
        }

        const medicAvailableTimes = medicPeriods.reduce((current, period) => {
            if (period.entryType === EntryType.Work) {
                current = isTimeWithinRange(
                    calendarEntry.dateStart,
                    calendarEntry.time,
                    period
                )
            }

            return current
        }, false)

        const medicFreeTimes = medicPeriods.reduce((current, period) => {
            if (period.entryType === EntryType.Free) {
                current = isTimeWithinRange(
                    calendarEntry.dateStart,
                    calendarEntry.time,
                    period
                )
            }

            return current
        }, false)

        if (!medicAvailableTimes || medicFreeTimes) {
            return false
        }

        const newCalendarEntryId = (
            await saveCalendarEntry(calendarEntry)
        ).shift()?.id

        if (newCalendarEntryId) {
            await createEntryRelation(newCalendarEntryId, patient)
            await createEntryRelation(newCalendarEntryId, medic)
            await saveSchedule({
                ...schedule,
                calendarEntry: newCalendarEntryId,
            })
            return true
        }
    }
}
