import { Errors } from '@Domain/Enum'
import type { DatabaseError } from 'pg'

type ErrorResponse = {
    message?: string
    table?: string
    constraint?: string
    code: number
}

export const handleError = (
    error: Errors,
    table?: string,
    constraint?: string
) => {
    const response: ErrorResponse = { message: error.toString(), code: 500 }
    // @ts-ignore
    const errorEntry = Object.keys(Errors).find((key) => Errors[key] === error)

    if (errorEntry) {
        const code = errorEntry[0]
        const errorType = code.toString().charAt(0)

        if (errorType === 'B') {
            response.code = 400
        } else if (errorType === 'N') {
            response.code = 404
        } else if (errorType === 'C') {
            response.code = 409
        } else if (errorType === 'Z') {
            response.code = Number(error)
            response.message = undefined
        }

        response.table = table
        response.constraint = constraint
    }

    return response
}

export const handleDatabaseError = (error: DatabaseError) => {
    switch (error.code) {
        case '23505': // Violación de restricción UNIQUE
            return handleError(Errors.C_ANY00, error.table, error.constraint)
        case '23503': // Violación de llave foránea
            return handleError(Errors.B_ANY00, error.table, error.constraint)
        default: // Otros errores no manejados específicamente
            return handleError(Errors.Z_INTERNAL)
    }
}
