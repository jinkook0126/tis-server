import { Context } from 'koa';
import { NewUser } from '@/models/test';
import * as testData from '@/data/test';
export async function createUser(ctx: Context) {
  const newUserInfo = ctx.request.body as NewUser;
  const insertId = await testData.createUser(newUserInfo);
  ctx.body = {
    insertId,
  };
}
export async function getUser(ctx: Context) {}
