import type { Errors } from '../../Domain/Enum/errors.ts'

export const errorManagement = (error: Errors) => {
    return { error }
}
