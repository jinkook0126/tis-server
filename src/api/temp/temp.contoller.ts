import { Context } from 'koa';
import * as tempData from './temp.data';
import { IUser } from '@/models/temp';

export async function getUserList(context: Context) {
  const userList = await tempData.getUserList();
  context.body = { ...userList };
}
export async function getPathVariableUser(context: Context) {
  const { name } = context.params;
  if (name === '' || name === undefined) {
    context.body = {
      success: false,
      msg: '이름은 필수 입니다.',
    };
    return;
  }
  const user = await tempData.getUser(name);
  context.body = { ...user };
}
export async function getQueryStringUser(context: Context) {
  const { name } = context.request.query as { name: string };
  if (name === '' || name === undefined) {
    context.body = {
      success: false,
      msg: '이름은 필수 입니다.',
    };
    return;
  }
  const user = await tempData.getUser(name);
  context.body = { ...user };
}
export async function insertUser(context: Context) {
  const { username, age } = context.request.body as IUser;
  if (username === '' || username === undefined) {
    context.body = {
      success: false,
      msg: '이름은 필수 입니다.',
    };
    return;
  }
  if (isNaN(Number(age)) || age === undefined) {
    context.body = {
      success: false,
      msg: '나이를 확인해주세요.',
    };
    return;
  }
  const data = await tempData.insertUser({ username, age });
  context.body = { ...data };
}
export async function updateUser(context: Context) {
  const { username, age, idx } = context.request.body as IUser;
  if (idx === undefined) {
    context.body = {
      success: false,
      msg: '수정할 id 값은 필수 입니다.',
    };
    return;
  }
  if (username === '' || username === undefined) {
    context.body = {
      success: false,
      msg: '이름은 필수 입니다.',
    };
    return;
  }
  if (isNaN(Number(age)) || age === undefined) {
    context.body = {
      success: false,
      msg: '나이를 확인해주세요.',
    };
    return;
  }
  const data = await tempData.updateUser({ username, age, idx });
  context.body = { ...data };
}
export async function deleteuser(context: Context) {
  const { idx } = context.request.body as { idx: number };
  if (idx === undefined) {
    context.body = {
      success: false,
      msg: '수정할 id 값은 필수 입니다.',
    };
    return;
  }
  const data = await tempData.deleteUser(idx);
  context.body = { ...data };
}
