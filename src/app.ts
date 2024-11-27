import Express, { json } from 'express'
import { AuthController, UserController } from '@Controller/User'
import { errorManagement } from '@Middleware/ErrorManagement.ts'
import { interceptor } from '@Middleware/SecurityMiddelware.ts'
import { UserCalendarController } from '@Controller/UserCalendar'
import { UserCalendarEntryController } from '@Controller/UserCalendarEntry'
import { ProcedureController } from '@Controller/Procedure'
import { ScheduleController } from '@Controller/Schedule'
import cors from 'cors'

const app = Express()

app.use(json())
app.use(cors({ origin: '*' }))
app.use(interceptor)
app.use(errorManagement)

app.use(UserController)
app.use(AuthController)
app.use(UserCalendarController)
app.use(UserCalendarEntryController)
app.use(ProcedureController)
app.use(ScheduleController)
app.use('*', (req, res) => res.sendStatus(404))

export default app
