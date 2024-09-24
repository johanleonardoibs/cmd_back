import express from 'express';
import {registerUser} from "../../Service/User";

const router = express.Router();
const ROUTE = '/user'

export const UserController = router.post(ROUTE, (req, res) => {
    const user = req.body
    user.user_secret = 'asd'

    registerUser(user).then((obj) => {
        res.json(obj)
    })
})
