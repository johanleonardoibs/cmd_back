import type { User, UserToken } from '@Domain/Entity'
import jwt from 'jsonwebtoken'
import { environment } from '@Utils/environment.ts'

export const encryptToken = (user: UserToken) => {
    return jwt.sign(user, environment.APP_SECRET, {
        expiresIn: '1 hour',
    })
}

export const validateToken = (token: string) => {
    return jwt.verify(token, environment.APP_SECRET) as User
}
