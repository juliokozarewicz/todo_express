import { NextFunction, Request, Response } from 'express';
import { StandardResponse } from '../../01_shared/StandardResponse';
import { CreateCategoryService } from '../b_services/CreateCategoryService';

export class CreateCategoryController {

    async handle(req: Request, res: Response, next: NextFunction) {

        try {

            const getMessage = (req.query.message as string) || 'Hello World!!!'; 
            const createCategoryService = new CreateCategoryService();
            
            await createCategoryService.execute(getMessage);

            const successResponse: StandardResponse = {
                status: 'success',
                code: 201,
                message: 'category created successfully',
                links: {
                    self: req.originalUrl,
                }
            };

            res.status(201).json(successResponse);

        } catch (error) {
            next(error);
        }

    }

}