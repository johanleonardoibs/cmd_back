import type { Request, Response } from 'express'

export const errorManagement = (
    req: Request,
    res: Response,
    next: () => any
) => {
    const originalJson = res.json.bind(res)

    res.json = function (body) {
        if (body && body.message && body.code) {
            res.status(body.code)
        }
        return originalJson(body)
    }

    next()
}
