import { NextFunction, Request, Response } from 'express';
import { CreateCategoryService } from '../b_services/CreateCategoryService';

export class CreateCategoryController {

    private createCategoryService: CreateCategoryService;

    constructor() {
        this.createCategoryService = new CreateCategoryService();
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const categoryName = req.body.categoryName;
            const response = await this.createCategoryService.execute(categoryName);
            res.status(response.code).json(response);

        } catch (error) {
            next(error);
        }

    }

}