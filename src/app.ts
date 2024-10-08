import Express, { json } from 'express'
import { environment } from '@Utils/environment.ts'
import { AuthController, UserController } from '@Controller/User'

const app = Express()

app.use(json())

app.use(UserController)
app.use(AuthController)
app.use('*', (req, res) => res.sendStatus(404))

app.get('/envtest', (req, res) => {
    res.json(environment)
})

export default app
