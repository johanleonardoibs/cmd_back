import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { procedures } from '@Domain/Entity/Procedure'
import { fieldTypeEnum } from '@Domain/Entity/FieldType'

export const dynamicFields = pgTable('dynamic_fields', {
    id: serial('id').primaryKey(),
    procedure: integer('procedure')
        .notNull()
        .references(() => procedures.id),
    name: varchar('name').notNull(),
    description: varchar('description'),
    type: fieldTypeEnum('type').notNull(),
})

export type CreateDynamicField = Omit<typeof dynamicFields.$inferInsert, 'id'>
