import {StandardResponse} from '../../01_shared/StandardResponse'

export class CreateCategoryService {

    async execute(message: string): Promise<StandardResponse> {

        throw new Error('This is a custom error!!!!!!!!!!');

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
