import type { UserToken } from '../../Domain'
import jwt from 'jsonwebtoken'
import { environment } from '../../Utils/environment.ts'

export const encryptToken = (user: UserToken) => {
    return jwt.sign(user, environment.APP_SECRET, {
        expiresIn: '1 hour',
    })
}
