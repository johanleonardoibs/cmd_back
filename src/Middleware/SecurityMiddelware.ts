import type { Request, Response } from 'express'
import { validateToken } from '@Security/Auth'
import { Paths } from '@Controller/paths.ts'
import { Role, type User } from '@Domain/Entity'

declare module 'express-serve-static-core' {
    interface Request {
        user?: User
    }
}

const pathPermissions: Record<string, Role[]> = {
    [Paths.CALENDAR_PERIOD]: [Role.Admin, Role.Medic],
}

const isPathProtected = (path: string) => {
    return Object.keys(pathPermissions).includes(path)
}

const validateRole = (path: string, userRole: Role) => {
    if (userRole) {
        return pathPermissions[path].includes(userRole) ?? false
    }

    return false
}

export const interceptor = (req: Request, res: Response, next: () => any) => {
    const token = req.headers.authorization?.split(' ')[1] ?? ''

    if (!isPathProtected(req.path)) return next()
    if (token) {
        const user = validateToken(token)

        if (user) {
            req.user = user

            if (validateRole(req.path, user.role as Role)) {
                return next()
            } else {
                return res.sendStatus(401)
            }
        }
    }

    return res.sendStatus(403)
}
