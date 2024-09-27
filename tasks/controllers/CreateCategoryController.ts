import { Request, Response } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { StandardResponse } from '../../01_shared/StandardResponse';

export class CreateCategoryController {

    async handle(req: Request, res: Response) {

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

            const errorResponse: StandardResponse = {
                status: 'success',
                code: 201,
                message: `${error}`,
                links: {
                    self: req.originalUrl,
                }
            };

            res.status(500).json(errorResponse);
        }

    }

}