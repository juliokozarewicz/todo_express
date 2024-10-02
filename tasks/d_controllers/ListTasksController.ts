import { NextFunction, Request, Response } from 'express'
import { ListAllTasksService } from '../c_services/listAllTasksService'

export class ListTasksController {

    async handle(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            // call execute
            const listAllTasksService = new ListAllTasksService()
            const response = await listAllTasksService.execute()

            //response
            res.status(response.code).json(response)

        } catch (error) {
            next(error)
        }

    }

}