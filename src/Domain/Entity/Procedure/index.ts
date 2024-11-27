import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import type { CreateDynamicField } from '@Domain/Entity/DynamicField'

export const procedures = pgTable('procedures', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    cups: varchar('cups').notNull().unique(),
    sessionDuration: integer('session_duration').notNull(),
})

export type CreateProcedure = Omit<typeof procedures.$inferInsert, 'id'>
export type CreateProcedurePost = CreateProcedure & {
    fields: CreateDynamicField[]
}
