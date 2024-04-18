import Router from 'koa-router';
import auth from '@/api/auth';

const routes = new Router();

routes.use('/auth', auth.routes());

routes.get('/', async ctx => {
  ctx.body = {
    message: 'hello world',
  };
});

export default routes;
