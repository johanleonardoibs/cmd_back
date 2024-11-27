import {
    type CreateDynamicField,
    dynamicFields,
} from '@Domain/Entity/DynamicField'
import { db } from '@Utils/DatabaseConnection.ts'

export const saveDynamicFields = async (
    newDynamicFields: CreateDynamicField[]
) => {
    return db.insert(dynamicFields).values(newDynamicFields)
}
