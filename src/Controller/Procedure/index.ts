import express from 'express'
import { Paths } from '@Controller/paths.ts'
import type { CreateProcedurePost } from '@Domain/Entity/Procedure'
import { createProcedure, getAllProcedures } from '@Service/Procedure'
import { handleError } from '@Utils/ErrorManagement'
import { Errors } from '@Domain/Enum'

const router = express.Router()

export const ProcedureController = router
    .post(Paths.PROCEDURE, async (req, res) => {
        const procedure: CreateProcedurePost = req.body
        if (await createProcedure(procedure)) {
            res.sendStatus(201)
        } else {
            res.json(handleError(Errors.B_ANY01, 'procedure'))
        }
    })
    .get(Paths.PROCEDURE, async (req, res) => {
        return res.json(await getAllProcedures())
    })
