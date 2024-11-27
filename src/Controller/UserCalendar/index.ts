import express from 'express'
import type { CreateCalendarPeriod } from '@Domain/Entity/CalendarPeriod'
import { Paths } from '@Controller/paths.ts'
import {
    createCalendarPeriod,
    getUserCalendarPeriods,
} from '@Service/UserCalendar'
import { getUserById } from '@Repository'

const router = express.Router()

export const UserCalendarController = router
    .post(Paths.CALENDAR_PERIOD, (req, res) => {
        const userCalendarPeriod: CreateCalendarPeriod = req.body

        if (req.user) {
            createCalendarPeriod(userCalendarPeriod, req.user).then(() => {
                res.sendStatus(201)
            })
        }
    })
    .get(Paths.CALENDAR_PERIOD_USER, async (req, res) => {
        const userId = req.params.user
        const user = (await getUserById(Number(userId))).shift()

        if (user) {
            getUserCalendarPeriods(user).then((response) => {
                res.json(response)
            })
        }
    })
