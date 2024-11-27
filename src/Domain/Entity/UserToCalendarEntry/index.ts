import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { calendarEntries, users } from '@Domain/Entity'

export const userToCalendarEntry = pgTable('user_to_calendar_entry', {
    id: serial('id').primaryKey(),
    user: integer('user')
        .notNull()
        .references(() => users.id),
    calendarEntry: integer('calendar_entry')
        .notNull()
        .references(() => calendarEntries.id),
})
