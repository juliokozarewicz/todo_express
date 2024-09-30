import { Router } from 'express';
import { CreateCategoryController } from './controllers/CreateCategoryController';

const router = Router();

// routes
router.post('/category/create', new CreateCategoryController().handle.bind(new CreateCategoryController()));

// docs
// ============================================================================
// --------------------------------------------------------
/**
* @swagger
* /tasks/category/create:
*   post:
*     summary: create a new category
*     security:
*       - jwt: []
*     tags: [CATEGORY]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               categoryName:
*                 type: string
*                 example: "finance"
*     responses:
*       201:
*         description: Category created successfully
*         content:
*           application/json:
*             examples:
*               successResponse:
*                 value:
*                   {
*                     "status": "success",
*                     "code": 201,
*                     "idCreated": "uuid",
*                     "message": "category created successfully",
*                     "links": {
*                       "self": "/category/create",
*                       "next": "/category/list-all"
*                     }
*                   }
* 
*/
// --------------------------------------------------------

// --------------------------------------------------------
/**
* @swagger
* /category/list-all:
*   get:
*     summary: list all categories
*     security:
*       - jwt: []
*     tags: [CATEGORY]
*/
// --------------------------------------------------------
// ============================================================================

export default router;