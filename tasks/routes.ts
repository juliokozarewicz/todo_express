import { Router } from 'express';
import { CreateCategoryController } from './controllers/CreateCategoryController';

const router = Router();

router.post('/category/create', new CreateCategoryController().handle.bind(new CreateCategoryController()));

export default router;