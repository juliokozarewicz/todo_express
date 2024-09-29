import { Router } from 'express';
import { CreateCategoryController } from './controllers/CreateCategoryController';

const router = Router();

/**
* @swagger
* /category/create:
*   post:
*     summary: create a new category
*     tags: [CATEGORY]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "Nova Categoria"
*     responses:
*       201:
*         description: Categoria criada com sucesso
*/
router.post('/category/create', new CreateCategoryController().handle.bind(new CreateCategoryController()));

export default router;