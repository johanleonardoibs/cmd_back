import express from 'express'
import { login, registerUser } from '@Service/User'
import type { UserLogin } from '@Domain/Entity'

const router = express.Router()

const ROUTE = '/user'
const ROUTE_AUTH = '/login'

export const UserController = router.post(ROUTE, async (req, res) => {
    const user = req.body

    const error = await registerUser(user)
    if (error) {
        return res.json(error)
    }

    res.sendStatus(201)
})

export const AuthController = router.post(ROUTE_AUTH, async (req, res) => {
    const user: UserLogin = req.body

    res.json(await login(user))
})
