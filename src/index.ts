import './env';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import routes from '@/api';
const app = new Koa();
const port = 3010;

app.use(bodyParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`);
});
