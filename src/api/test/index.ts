import Router from 'koa-router';
const router = new Router();

interface loginRequest {
  id: string;
  pw: string;
}
router.get('/get', ctx => {
  ctx.body = 'success';
});

router.get('/get-json', ctx => {
  ctx.body = {
    success: true,
    age: 20,
  };
});

router.get('/get-path-variable/:name?', ctx => {
  const { name } = ctx.params;
  ctx.body = `${name ?? '아무개'} 의 호출`;
});

router.get('/get-query-string', ctx => {
  const { foo } = ctx.request.query;
  ctx.body = `${foo ?? '준거 없잖아ㅡㅡ'} 의 호출`;
});

router.post('/post', ctx => {
  const { id, pw } = <loginRequest>ctx.request.body;
  console.log(id, pw);
  ctx.body = {
    id,
    pw,
  };
});

export default router;
