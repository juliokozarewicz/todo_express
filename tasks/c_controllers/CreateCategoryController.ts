import { NextFunction, Request, Response } from 'express';
import { CreateCategoryService } from '../b_services/CreateCategoryService';

export class CreateCategoryController {



    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            
            // body vars
            const categoryName = req.body.categoryName;

            // call execute
            const createCategoryService = new CreateCategoryService();
            const response = await createCategoryService.execute(categoryName);

            //response
            res.status(response.code).json(response);

        } catch (error) {
            next(error);
        }

    }

}