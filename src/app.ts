import Express, {json} from 'express'
import {environment} from "./Config/environment.ts";
import {UserController} from "./Controller/User";

const app = Express()

app.use(json())

app.use(UserController)

app.get('/envtest', (req, res) => {
    res.json(environment)
})

export default app