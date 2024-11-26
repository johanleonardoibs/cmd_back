import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const calendarEntry = pgTable('calendar_entry', {
    id: serial('id').primaryKey(),
    userCalendar: integer('user_calendar'),
    dateStart: timestamp('date_start'),
    time: integer('time'),
})
