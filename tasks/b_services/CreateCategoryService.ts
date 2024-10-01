import { StandardResponse } from '../../01_shared/StandardResponse'
import { createCustomError } from '../e_middlewares/errorHandler';

import { AppDataSource } from '../server';
import { CategoryEntity } from '../a_entities/CategoryEntity';

export class CreateCategoryService {

    async execute(categoryName: string): Promise<StandardResponse> {
        
        const categoryNameCase = categoryName.toLowerCase();
        const categoryRepository = AppDataSource.getRepository(CategoryEntity);
        const newCategory = categoryRepository.create({ category: categoryNameCase });
        await categoryRepository.save(newCategory);

        return {
            "status": 'success',
            "code": 201,
            "message": `${categoryName} created successfully`,
            "idCreated": `${newCategory.id}`,
            "links": {
                "self": '/category/create',
            }
        }
    }

}
