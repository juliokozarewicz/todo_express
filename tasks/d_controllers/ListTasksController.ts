import { NextFunction, Request, Response } from 'express'
import { ListAllTasksService } from '../c_services/ListTasksService'
import { ListTaskValidation } from '../b_validations/ListTaskValidation';
import { escape } from 'lodash'

export class ListTasksController {

    async handle(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            // validation (ZOD)
            const validatedBody = ListTaskValidation.parse(req.params);

            // data object (escape)
            const validatedData = {
                taskname: validatedBody.taskname ? escape(validatedBody.taskname) : undefined,
                category: validatedBody.category ? escape(validatedBody.category) : undefined,
                description: validatedBody.description ? escape(validatedBody.description) : undefined,
                duedate: validatedBody.duedate ? new Date(validatedBody.duedate) : undefined,
                status: validatedBody.status ? escape(validatedBody.status) : undefined
            }

            // call execute
            const listAllTasksService = new ListAllTasksService()
            const response = await listAllTasksService.execute(validatedData)

            //response
            res.status(response.code).json(response)

        } catch (error) {
            next(error)
        }

    }

}