import { StandardResponse } from '../../01_shared/StandardResponse'
import { createCustomError } from '../e_middlewares/errorHandler';
import { AppDataSource } from '../server';
import { CategoryEntity } from '../a_entities/CategoryEntity';

export class CreateCategoryService {

    async execute(categoryName: string): Promise<StandardResponse> {
        
        // typography
        const categoryNameCase = categoryName.toLowerCase();

        // database operations
        //-------------------------------------------------------------------------
        const categoryRepository = AppDataSource.getRepository(CategoryEntity);

        const existingCategory = await categoryRepository.findOne({
            where: { category: categoryNameCase }
        });

        if (existingCategory) {
            throw createCustomError({
                "message": `'${existingCategory.category}' already exists`,
                "code": 409,
                "next": "/tasks/category/create",
                "prev": "/tasks/category/create",
            })
        }

        const newCategory = categoryRepository.create({ category: categoryNameCase });
        await categoryRepository.save(newCategory);
        //-------------------------------------------------------------------------

        return {
            "status": 'success',
            "code": 201,
            "message": `'${categoryName}' created successfully`,
            "idCreated": `${newCategory.id}`,
            "links": {
                "self": '/tasks/category/create',
            }
        }
    }

}
