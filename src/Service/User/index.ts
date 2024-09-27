import {
    type NewUser,
    type NewUserWithOutPassword,
    type UserLogin,
} from '@Domain/Entity'
import { getUser, saveUser } from '../../Repository'
import { Errors } from '@Domain/Enum'
import { errorManagement } from '@Utils/ErrorManagement'
import { encryptToken } from '@Security/Auth'
import { decryptPassword, encryptPassword } from '@Security/Encrypt'

export const registerUser = async (user: NewUserWithOutPassword) => {
    const userFull: NewUser = user

    userFull.password = await encryptPassword('default')

    await saveUser(user)
}

export const login = async (userLogin: UserLogin) => {
    const user = (await getUser(userLogin.email)).shift()

    if (user?.password) {
        const authOk = await decryptPassword(userLogin.password, user.password)
        if (authOk) {
            return {
                token: encryptToken(user),
                username: user.name + ' ' + user.surname,
            }
        }
    }

    throw errorManagement(Errors.USER00)
}
