import { StandardResponse } from '../../01_shared/StandardResponse'
import { AppDataSource } from '../server'
import { CategoryEntity } from '../a_entities/CategoryEntity'

export class ListAllCategoriesService {

    async execute(
    ): Promise<StandardResponse> {

        // database operations
        //-------------------------------------------------------------------------
        const categoryRepository = AppDataSource.getRepository(CategoryEntity)

        const existingCategory = await categoryRepository.find({
            where: {},
            select: ['id', 'category'],
        })
        //-------------------------------------------------------------------------

        return {
            "status": 'success',
            "code": 201,
            "message": "successfully obtained data",
            "data": existingCategory,
            "meta": {
                "total": existingCategory.length,
            },
            "links": {
                "self": '/tasks/category/list-all',
                "next": '/tasks/',
            }
        }

    }

}
