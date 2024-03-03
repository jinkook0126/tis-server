import db from '@/db';
import { NewUser, UserList, ServerRespone } from '@/models/test';

export async function createUser(newUserInfo: NewUser): Promise<string> {
  const { username, age } = newUserInfo;
  const query = 'insert into test_db (username, age) values (?,?);';
  try {
    await db.execute(query, [username, age]);
    return username;
  } catch (e) {
    console.log(e);
    return 'error';
  }
}

export async function getUser(): Promise<ServerRespone<UserList[]>> {
  const query = 'select * from test_db;';
  try {
    const [users] = await db.execute<UserList[]>(query);
    return {
      success: true,
      result: users,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '조회 실패 ㅎㅎ',
    };
  }
}
