import { Router } from 'express';
import { CreateCategoryController } from './c_controllers/CreateCategoryController';
import { ListAllCategoriesController } from './c_controllers/ListAllCategoriesController';

const router = Router();

// routes
router.post('/category/create', new CreateCategoryController().handle.bind(new CreateCategoryController()));
router.get('/category/list-all', new ListAllCategoriesController().handle.bind(new ListAllCategoriesController()));

export default router;