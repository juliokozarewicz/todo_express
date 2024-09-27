import { Router } from 'express';
import { CreateCategoryController } from './controllers/CreateCategoryController';

const router = Router();
const createCategoryController = new CreateCategoryController();

router.get('/category/create', createCategoryController.execute.bind(createCategoryController));

export default router;