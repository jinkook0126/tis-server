import db from '@/db';
import { NewUser } from '@/models/test';

export async function createUser(newUserInfo: NewUser): Promise<string> {
  const { username, age } = newUserInfo;
  const query = 'insert into test_db (username, age) values (?,?);';
  try {
    const conn = db();
    await conn.execute(query, [username, age]);
    return username;
  } catch (e) {
    console.log(e);
    return 'error';
  }
}
