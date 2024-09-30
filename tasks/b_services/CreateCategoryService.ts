import { StandardResponse } from '../../01_shared/StandardResponse'
import { createCustomError } from '../e_middlewares/errorHandler';

export class CreateCategoryService {

    async execute(message: string): Promise<StandardResponse> {

        return {
            "status": 'succes',
            "code": 200,
            "message": `${message}`,
            "links": {
                "self": '/category/create',
            }
        }
    }

}
