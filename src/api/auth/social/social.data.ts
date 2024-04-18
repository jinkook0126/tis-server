import db from '@/db';
import { RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  userId: string;
  username: string;
  email: string;
  thumbnail: string | null;
  about?: string;
}
interface UserExtRowData extends RowDataPacket, User {}

export const findUserByMailAndProvider = async (email: string, provider: string): Promise<UserExtRowData> => {
  const query = 'select hex(id), userId, username, email, thumbnail, about from users where email=? and provider=?';
  try {
    const [user] = await db.execute<UserExtRowData[]>(query, [email, provider]);
    return user[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const checkDuplicateByuserId = async (userId: string): Promise<boolean> => {
  const query = 'select count(*) as cnt from users where userId=?';
  try {
    const [user] = await db.execute<UserExtRowData[]>(query, [userId]);
    return user[0].cnt === 1;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const registerUser = async (profile: Omit<User, 'id'>, provider: string): Promise<string> => {
  const uuid = uuidv4();
  const orderedUuid = uuid.split('-');
  const recombination = orderedUuid[2] + orderedUuid[1] + orderedUuid[0] + orderedUuid[3] + orderedUuid[4];
  const query = `insert into users(id, userId, username, email, about, thumbnail, provider, created_at, updated_at) values (unhex(?),?,?,?,?,?,?,now(),now());`;
  try {
    await db.execute(query, [
      recombination,
      profile.userId,
      profile.username,
      profile.email,
      profile.about,
      profile.thumbnail,
      provider,
    ]);
    return recombination;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
