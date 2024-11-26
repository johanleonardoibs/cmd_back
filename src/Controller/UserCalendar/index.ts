import express from 'express'
import type { CreateCalendarPeriod } from '@Domain/Entity/CalendarPeriod'
import { Paths } from '@Controller/paths.ts'
import { createCalendarPeriod } from '@Service/UserCalendar'

const router = express.Router()

export const UserCalendarController = router.post(
    Paths.CALENDAR_PERIOD,
    (req, res) => {
        const userCalendarPeriod: CreateCalendarPeriod = req.body

        if (req.user) {
            void createCalendarPeriod(userCalendarPeriod, req.user)
        }

        res.json(userCalendarPeriod)
    }
)
