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
    [Paths.CALENDAR_PERIOD + '_POST']: [Role.Admin, Role.Medic],
    [Paths.CALENDAR_ENTRY + '_POST']: [Role.Admin],
    [Paths.CALENDAR_ENTRY + '_GET']: [Role.Admin, Role.Medic, Role.Patient],
    [Paths.PROCEDURE + '_POST']: [Role.Admin],
    [Paths.PROCEDURE + '_GET']: [Role.Admin],
    [Paths.SCHEDULE + '_POST']: [Role.Admin],
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

    if (!isPathProtected(req.path + '_' + req.method)) return next()
    if (token) {
        try {
            const user = validateToken(token)

            if (user) {
                req.user = user

                if (
                    validateRole(req.path + '_' + req.method, user.role as Role)
                ) {
                    return next()
                } else {
                    return res.sendStatus(401)
                }
            }
        } catch (e) {
            return res.sendStatus(403)
        }
    }

    return res.sendStatus(403)
}
