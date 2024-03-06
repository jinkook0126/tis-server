import { Context } from 'koa';
import * as tempData from './temp.data';
import { IUser } from '@/models/temp';

export async function getUserList(context: Context) {
  const userList = await tempData.getUserList();
  context.body = { ...userList };
}
export async function getPathVariableUser(context: Context) {
  const { name } = context.params;
  const user = await tempData.getUser(name);
  context.body = { ...user };
}
export async function getQueryStringUser(context: Context) {
  const { name } = context.request.query as { name: string };
  const user = await tempData.getUser(name);
  context.body = { ...user };
}
export async function insertUser(context: Context) {
  const { username, age } = context.request.body as IUser;
  const data = await tempData.insertUser({ username, age });
  context.body = { ...data };
}
export async function updateUser(context: Context) {
  const { username, age, idx } = context.request.body as IUser;
  const data = await tempData.updateUser({ username, age, idx });
  context.body = { ...data };
}
export async function deleteuser(context: Context) {
  const { idx } = context.request.body as { idx: number };
  const data = await tempData.deleteUser(idx);
  context.body = { ...data };
}
