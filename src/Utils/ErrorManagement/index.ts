import type { Errors } from '@Domain/Enum'

export const errorManagement = (error: Errors) => {
    return { error }
}
