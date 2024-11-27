import express from 'express'
import { Paths } from '@Controller/paths.ts'
import type { CreateSchedulePost } from '@Domain/Entity'
import { createSchedule } from '@Service/Schedule'
import { handleError } from '@Utils/ErrorManagement'
import { Errors } from '@Domain/Enum'

const router = express.Router()

export const ScheduleController = router.post(
    Paths.SCHEDULE,
    async (req, res) => {
        const schedule: CreateSchedulePost = req.body
        if (await createSchedule(schedule)) {
            res.sendStatus(201)
        } else {
            res.json(handleError(Errors.BC_CONF00, 'schedule'))
        }
    }
)
