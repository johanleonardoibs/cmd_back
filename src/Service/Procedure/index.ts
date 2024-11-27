import type { CreateProcedurePost } from '@Domain/Entity/Procedure'
import { getProcedures, saveDynamicFields, saveProcedure } from '@Repository'

export const createProcedure = async (procedure: CreateProcedurePost) => {
    const procedureId = (await saveProcedure(procedure)).shift()?.id

    if (procedureId) {
        await saveDynamicFields(
            procedure.fields.map((field) => ({
                ...field,
                procedure: procedureId,
            }))
        )
        return true
    }

    return false
}

export const getAllProcedures = async () => {
    return await getProcedures()
}
