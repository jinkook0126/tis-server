import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import testRouter from '@/api/test';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = new Koa();
const router = new Router();
const port = 3010;

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.use('/test', testRouter.routes());

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`);
});
