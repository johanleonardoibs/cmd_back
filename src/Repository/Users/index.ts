import { db } from '@Utils/DatabaseConnection.ts'
import { type NewUser, users } from '@Domain/Entity'
import { eq } from 'drizzle-orm'

export const saveUser = async (user: NewUser) => {
    return db.insert(users).values(user)
}

export const getUser = async (email: string) => {
    return db.select().from(users).where(eq(users.email, email)).execute()
}
