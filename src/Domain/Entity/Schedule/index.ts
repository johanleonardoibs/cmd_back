import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import {
    calendarEntries,
    type CreateCalendarEntry,
    users,
} from '@Domain/Entity'
import { procedures } from '@Domain/Entity/Procedure'

export const schedules = pgTable('schedules', {
    id: serial('id').primaryKey(),
    calendarEntry: integer('calendarEntry')
        .notNull()
        .references(() => calendarEntries.id),
    medic: integer('medic')
        .notNull()
        .references(() => users.id),
    patient: integer('patient')
        .notNull()
        .references(() => users.id),
    procedure: integer('procedure')
        .notNull()
        .references(() => procedures.id),
})

export type CreateSchedule = Omit<typeof schedules.$inferInsert, 'id'>
export type CreateSchedulePost = CreateSchedule & {
    date: CreateCalendarEntry
}
