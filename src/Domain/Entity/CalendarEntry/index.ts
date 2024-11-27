import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const calendarEntries = pgTable('calendar_entry', {
    id: serial('id').primaryKey(),
    dateStart: timestamp('date_start').notNull(),
    time: integer('time').notNull(),
})

export type CreateCalendarEntry = Omit<
    typeof calendarEntries.$inferInsert,
    'id'
>
export type CalendarEntry = typeof calendarEntries.$inferSelect
