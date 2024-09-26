import { Router } from 'express';
import { helloWorld } from './controllers/controllers';

const router = Router();

router.get('/helloworld', helloWorld);

export default router;