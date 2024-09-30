import { Router } from 'express';
import { CreateCategoryController } from './c_controllers/CreateCategoryController';

const router = Router();

// routes
router.post('/category/create', new CreateCategoryController().handle.bind(new CreateCategoryController()));

export default router;