import Express, { json } from 'express'
import { AuthController, UserController } from '@Controller/User'
import { errorManagement } from '@Middleware/ErrorManagement.ts'

const app = Express()
app.use(errorManagement)

app.use(json())

app.use(UserController)
app.use(AuthController)
app.use('*', (req, res) => res.sendStatus(404))

export default app
