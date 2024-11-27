import { type CreateProcedure, procedures } from '@Domain/Entity/Procedure'
import { db } from '@Utils/DatabaseConnection.ts'
import { eq } from 'drizzle-orm'

export const saveProcedure = async (procedure: CreateProcedure) => {
    return db
        .insert(procedures)
        .values(procedure)
        .returning({ id: procedures.id })
}

export const getProcedure = async (id: number) => {
    return db.select().from(procedures).where(eq(procedures.id, id)).execute()
}

export const getProcedures = async () => {
    return db.select().from(procedures).execute()
}
