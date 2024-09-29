import { StandardResponse } from '../../01_shared/StandardResponse'
import { createCustomError } from '../middlewares/errorHandler';

export class CreateCategoryService {

    async execute(message: string): Promise<StandardResponse> {


        throw createCustomError({
            message: 'Message is required',
            code: 500,
            next: '/next-page',
            prev: '/prev-page'
        });
      

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
