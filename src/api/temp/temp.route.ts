import Router from 'koa-router';
import * as tempControllers from './temp.contoller';
import {
  validateNameByPathParam,
  validateNameByQeuryString,
  validateNameAge,
  validateNameAgeIdx,
  validateIdx,
} from '@/middleware/temp/validate';

const router = new Router();

router.get('/get-users-list', tempControllers.getUserList);
router.get('/get-path-variable-user/:name?', validateNameByPathParam, tempControllers.getPathVariableUser);
router.get('/get-query-string-user', validateNameByQeuryString, tempControllers.getQueryStringUser);
router.post('/insert-user', validateNameAge, tempControllers.insertUser);
router.post('/update-user', validateNameAgeIdx, tempControllers.updateUser);
router.post('/delete-user', validateIdx, tempControllers.deleteuser);

export default router;
