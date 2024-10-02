import { NextFunction, Request, Response } from 'express'
import { escape } from 'lodash'
import { UpdateTaskValidation } from '../b_validations/UpdateTaskValidation'
import { UpdateTaskService } from '../c_services/UpdateTaskService'

export class UpdateTaskController {

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            // validation
            const validatedBody = UpdateTaskValidation.parse({
                updateId: req.params.updateId,
                ...req.body,
              });

            // data object
            const validatedData = {
                updateId: escape(validatedBody.updateId),
                taskName: escape(validatedBody.taskName),
                category: escape(validatedBody.category),
                description: escape(validatedBody.description),
                dueDate: new Date(validatedBody.dueDate),
                statusName: escape(validatedBody.statusName)
            }

            // call execute
            const updateTaskService = new UpdateTaskService()
            const response = await updateTaskService.execute(validatedData)

            //response
            res.status(response.code).json(response)

        } catch (error) {
            next(error)
        }

    }

}