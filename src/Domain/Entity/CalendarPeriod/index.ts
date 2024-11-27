import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { entryTypeEnum } from '@Domain/Entity/EntryType'

export const calendarPeriod = pgTable('calendar_period', {
    id: serial('id').primaryKey(),
    dateStart: date('date_start').notNull(),
    initialHour: integer('initial_hour').notNull(),
    time: integer('time').notNull(),
    daysOfWeek: varchar('daysOfWeek').notNull(),
    weeks: integer('weeks').notNull(),
    entryType: entryTypeEnum('entryType').notNull(),
})

export type CalendarPeriod = typeof calendarPeriod.$inferSelect
export type CreateCalendarPeriod = Omit<
    typeof calendarPeriod.$inferInsert,
    'id'
>
