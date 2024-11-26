import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { entryTypeEnum } from '@Domain/Entity/EntryType'

export const calendarPeriod = pgTable('calendar_period', {
    id: serial('id').primaryKey(),
    userCalendarPeriod: integer('user_calendar_period'),
    dateStart: date('date_start'),
    initialHour: integer('initial_hour'),
    time: integer('time'),
    daysOfWeek: varchar('daysOfWeek'),
    weeks: integer('weeks'),
    entryType: entryTypeEnum('entryType'),
})

export type CalendarPeriod = typeof calendarPeriod.$inferSelect
export type CreateCalendarPeriod = Omit<
    typeof calendarPeriod.$inferInsert,
    'id'
>
