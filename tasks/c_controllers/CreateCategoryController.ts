import { NextFunction, Request, Response } from 'express';
import { CreateCategoryService } from '../b_services/CreateCategoryService';
import { CreateCategoryValidation } from '../d_validations/CreateCategoryValidation';
import { escape } from 'lodash';


export class CreateCategoryController {

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            // data init
            const validatedData = {
                categoryName: ''
            };

            // validation
            const validatedBody =  CreateCategoryValidation.parse(req.body);

            // assembled data
            validatedData.categoryName = escape(validatedBody.categoryName);

            // call execute
            const createCategoryService = new CreateCategoryService();
            const response = await createCategoryService.execute(validatedData);

            //response
            res.status(response.code).json(response);

        } catch (error) {
            next(error);
        }

    }

}