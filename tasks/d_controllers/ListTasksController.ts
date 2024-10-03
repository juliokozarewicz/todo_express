import { NextFunction, Request, Response } from 'express'
import { ListAllTasksService } from '../c_services/ListTasksService'
import { ListTaskValidation } from '../b_validations/ListTaskValidation';
import { escape } from 'lodash'
import { object } from 'zod';

export class ListTasksController {

    async handle(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            // clean query
            const queryAll = req.query;

            const cleanedQuery = Object.fromEntries(
                Object.entries(queryAll).map(([key, value]) => [key, value || undefined])
            );

            // validation (ZOD)
            const validatingData = ListTaskValidation.parse(cleanedQuery);

            // data object (escape)
            const validatedData = {
                taskname: validatingData.taskname ? escape(validatingData.taskname) : undefined,
                category: validatingData.category ? escape(validatingData.category) : undefined,
                description: validatingData.description ? escape(validatingData.description) : undefined,
                duedate: validatingData.duedate ? new Date(validatingData.duedate) : undefined,
                status: validatingData.status ? escape(validatingData.status) : undefined
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