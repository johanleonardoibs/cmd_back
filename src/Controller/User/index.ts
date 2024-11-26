import express from 'express'
import { login, registerUser } from '@Service/User'
import type { UserLogin } from '@Domain/Entity'
import { Paths } from '@Controller/paths.ts'

const router = express.Router()

export const UserController = router.post(
    Paths.USER_CREATE,
    async (req, res) => {
        const user = req.body

        const error = await registerUser(user)
        if (error) {
            return res.json(error)
        }

        res.sendStatus(201)
    }
)

export const AuthController = router.post(Paths.LOGIN, async (req, res) => {
    const user: UserLogin = req.body

    res.json(await login(user))
})
