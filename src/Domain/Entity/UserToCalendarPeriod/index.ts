import { integer, pgTable } from 'drizzle-orm/pg-core'
import { calendarPeriod } from '@Domain/Entity/CalendarPeriod'
import { users } from '@Domain/Entity'

export const userToCalendarPeriod = pgTable('user_to_calendar_period', {
    id: integer('id').primaryKey(),
    calendarPeriod: integer('calenda_period')
        .notNull()
        .references(() => calendarPeriod.id),
    user: integer('user')
        .notNull()
        .references(() => users.id),
})
