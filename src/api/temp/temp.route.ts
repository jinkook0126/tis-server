import Router from 'koa-router';
import * as tempControllers from './temp.contoller';

const router = new Router();

router.get('/get-users-list', tempControllers.getUserList);
router.get('/get-path-variable-user/:name?', tempControllers.getPathVariableUser);
router.get('/get-query-string-user', tempControllers.getQueryStringUser);
router.post('/insert-user', tempControllers.insertUser);
router.post('/update-user', tempControllers.updateUser);
router.post('/delete-user', tempControllers.deleteuser);

export default router;
