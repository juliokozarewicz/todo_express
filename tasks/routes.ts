import { Router } from 'express'
import { CreateCategoryController } from './c_controllers/CreateCategoryController'
import { ListAllCategoriesController } from './c_controllers/ListAllCategoriesController'
import { DeleteCategoryController } from './c_controllers/DeleteCategoryController'
import { CreateTaskController } from './c_controllers/CreateTaskController';

const router = Router();

// instances
const createCategoryController = new CreateCategoryController()
const listAllCategoriesController = new ListAllCategoriesController()
const deleteCategoryController = new DeleteCategoryController()
const createTaskController = new CreateTaskController()

// routes
router.post('/category/create', createCategoryController.handle.bind(createCategoryController))
router.get('/category/list-all', listAllCategoriesController.handle.bind(listAllCategoriesController))
router.delete('/category/delete/:categoryId', deleteCategoryController.handle.bind(deleteCategoryController))
router.post('/create', createTaskController.handle.bind(createTaskController))

export default router;