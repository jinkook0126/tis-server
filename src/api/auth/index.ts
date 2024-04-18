import Router from 'koa-router';
import social from '@/api/auth/social/social.route';

const routes = new Router();

routes.use('/social', social.routes());

export default routes;
