import { Request, Response } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService';

export class CreateCategoryController {
    async execute(req: Request, res: Response): Promise<any> {
        const getMessage = (req.query.message as string) || 'Hello World!!!'; // http://127.0.0.1:PORT/helloworld/helloworld?message=xxxxx
        const createCategoryService = new CreateCategoryService();

        try {
            const message = await createCategoryService.execute(getMessage);
            res.json({ message });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}