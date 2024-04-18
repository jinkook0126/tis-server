import Router from 'koa-router';
import {
  googleLoginCallback,
  socialLoginCallback,
  socialRedirect,
  getSocialProfile,
  socialRegister,
} from '@/api/auth/social/social.controller';
const routes = new Router();

routes.get('/google', googleLoginCallback, socialLoginCallback);
routes.get('/profile', getSocialProfile);
routes.get('/redirect/:provider', socialRedirect);
routes.post('/register', socialRegister);

export default routes;
