import Express, { json } from 'express'
import { AuthController, UserController } from '@Controller/User'
import { errorManagement } from '@Middleware/ErrorManagement.ts'
import { interceptor } from '@Middleware/SecurityMiddelware.ts'
import { UserCalendarController } from '@Controller/UserCalendar'

const app = Express()

app.use(json())
app.use(interceptor)
app.use(errorManagement)

app.use(UserController)
app.use(AuthController)
app.use(UserCalendarController)
app.use('*', (req, res) => res.sendStatus(404))

export default app
