import {pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {Role, roleEnum} from "../Role";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    surname: varchar('surname', { length: 256 }),
    email: varchar('email', { length: 256 }).unique(),
    role: roleEnum('role'),
    user_secret: varchar('user_secret', { length: 256 })
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;