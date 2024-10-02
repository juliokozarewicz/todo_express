import { StandardResponse } from '../../01_shared/StandardResponse'
import { TaskEntity } from '../a_entities/TaskEntity'
import { ListTaskValidationType } from '../b_validations/ListTaskValidation'
import { AppDataSource } from '../server'

export class ListAllTasksService {

    async execute(
        validatedData:ListTaskValidationType
    ): Promise<StandardResponse> {

        // database operations
        //-------------------------------------------------------------------------
        const TaskyRepository = AppDataSource.getRepository(TaskEntity)

        const existingTask = await TaskyRepository.find({
            where: {},
            select: [
                'id',
                'taskName',
                'category',
                'description',
                'dueDate',
                'statusName'
            ],
        })
        //-------------------------------------------------------------------------

        return {
            "status": 'success',
            "code": 200,
            "message": "data received successfully",
            "data": existingTask,
            "meta": {
                "total": existingTask.length,
            },
            "links": {
                "self": '/tasks/list',
                "next": '/tasks/',
                "prev": '/tasks/list',
            }
        }

    }

}
