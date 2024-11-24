import {
    pgEnum,
    pgTable,
    serial,
    unique,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core'
import { roleEnum } from '../Role'

export const citizenIdTypeEnum = pgEnum('citizenIdType', ['cc', 'ti', 'pp'])
export enum CitizenIdType {
    CC = 'cc',
    TI = 'ti',
    PP = 'pp',
}

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 256 }),
        surname: varchar('surname', { length: 256 }),
        email: varchar('email', { length: 256 }).unique('email'),
        citizenIdType: citizenIdTypeEnum('citizenIdType'),
        citizenId: varchar('citizenId', { length: 256 }),
        password: varchar('password', { length: 256 }),
        role: roleEnum('role'),
    },
    (table) => {
        return {
            unq_citizen: uniqueIndex('citizen').on(
                table.citizenId,
                table.citizenIdType
            ),
        }
    }
)

export type NewUserWithOutPassword = Omit<typeof users.$inferInsert, 'password'>
export type NewUser = typeof users.$inferInsert
export type UserToken = Omit<
    typeof users.$inferInsert,
    'password citizenId citizenIdType'
>
export type UserLogin = {
    email: string
    password: string
}
