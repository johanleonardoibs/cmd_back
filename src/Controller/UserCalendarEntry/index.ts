import express from 'express'
import { Paths } from '@Controller/paths.ts'
import { getUserById } from '@Repository/Users'
import type { CreateCalendarEntry } from '@Domain/Entity'
import { addCalendarEntry } from '@Service/UserCalendarEntry'
import { getUserCalendarPeriods } from '@Service/UserCalendar'

const router = express.Router()

export const UserCalendarEntryController = router
    .post(Paths.CALENDAR_ENTRY, async (req, res) => {
        const userId = req.params.user
        const user = (await getUserById(Number(userId))).shift()

        const calendarEntry: CreateCalendarEntry = req.body

        if (user) {
            const ok = await addCalendarEntry(user, calendarEntry)
            if (ok) res.json(201)
        }
    })
    .get(Paths.CALENDAR_ENTRY, async (req, res) => {
        const userId = req.params.user
        const user = (await getUserById(Number(userId))).shift()

        if (user) {
            const response = await getUserCalendarPeriods(user)
            res.json(response)
        }
    })
