import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const calendarEntry = pgTable('calendar_entry', {
    id: serial('id').primaryKey(),
    dateStart: timestamp('date_start').notNull(),
    time: integer('time').notNull(),
})

export type CreateCalendarEntry = Omit<typeof calendarEntry.$inferInsert, 'id'>
