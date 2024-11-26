import {
    type NewUser,
    type NewUserWithOutPassword,
    type UserLogin,
} from '@Domain/Entity'
import { getUser, saveUser } from '../../Repository'
import { handleDatabaseError, handleError } from '@Utils/ErrorManagement'
import { encryptToken } from '@Security/Auth'
import { decryptPassword, encryptPassword } from '@Security/Encrypt'
import type { DatabaseError } from 'pg'
import { Errors } from '@Domain/Enum'

export const registerUser = async (user: NewUserWithOutPassword) => {
    const userFull: NewUser = user

    userFull.password = await encryptPassword('default')

    try {
        await saveUser(user)
    } catch (error: unknown) {
        return handleDatabaseError(error as DatabaseError)
    }
}

export const login = async (userLogin: UserLogin) => {
    const user = (await getUser(userLogin.email)).shift()

    if (user?.password) {
        const authOk = await decryptPassword(userLogin.password, user.password)
        if (authOk) {
            return {
                token: encryptToken({ ...user, password: undefined }),
                username: user.name + ' ' + user.surname,
                role: user.role,
            }
        }
    }

    return handleError(Errors.B_USER00)
}
