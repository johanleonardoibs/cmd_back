import { type CreateSchedule, schedules } from '@Domain/Entity'
import { db } from '@Utils/DatabaseConnection.ts'

export const saveSchedule = (newSchedule: CreateSchedule) => {
    return db
        .insert(schedules)
        .values(newSchedule)
        .returning({ id: schedules.id })
}
