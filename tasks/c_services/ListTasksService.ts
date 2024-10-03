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

        const queryBuilder = TaskyRepository.createQueryBuilder('task');

        if (validatedData.taskname) {
            queryBuilder.andWhere(
                'LOWER(task.taskName) = LOWER(:taskName)',
                { taskName: validatedData.taskname }
            );
        }
        if (validatedData.category) {
            queryBuilder.andWhere(
                'LOWER(task.category) = LOWER(:category)',
                { category: validatedData.category }
            );
        }
        if (validatedData.description) {
            queryBuilder.andWhere(
                'LOWER(task.description) = LOWER(:description)',
                { description: validatedData.description }
            );
        }
        if (validatedData.duedate) {
            queryBuilder.andWhere(
                'task.dueDate = :dueDate',
                { dueDate: new Date(validatedData.duedate) }
            );
        }
        if (validatedData.status) {
            queryBuilder.andWhere(
                'LOWER(task.statusName) = LOWER(:statusName)',
                { statusName: validatedData.status }
            );
        }

        const existingTask = await queryBuilder
            .select([
                'task.id',
                'task.taskName',
                'task.category',
                'task.description',
                'task.dueDate',
                'task.statusName'
            ])
            .getMany();
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
