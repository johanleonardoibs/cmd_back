import express from 'express'
import { login, registerUser } from '../../Service/User'
import type { UserLogin } from '../../Domain'

const router = express.Router()

const ROUTE = '/user'
const ROUTE_AUTH = '/login'

export const UserController = router.post(ROUTE, (req, res) => {
    const user = req.body

    registerUser(user).then((obj) => {
        res.json(obj)
    })
})

export const AuthController = router.post(ROUTE_AUTH, async (req, res) => {
    const user: UserLogin = req.body

    try {
        res.json(await login(user))
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})
