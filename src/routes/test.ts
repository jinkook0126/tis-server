import Router from 'koa-router';
import * as testController from '@/controllers/test';

const router = new Router();

router.get('/get-user', testController.getUser);
router.post('/create-user', testController.createUser);

export default router;
