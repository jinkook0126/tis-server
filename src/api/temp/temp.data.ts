import db from '@/db';
import { ServerRespone } from '@/models/common';
import { IUser, IUserExtRowData } from '@/models/temp';
import { OkPacketParams, ResultSetHeader } from 'mysql2';

export async function getUserList(): Promise<ServerRespone<IUserExtRowData[]>> {
  const query = 'select * from test_db';
  try {
    const [userList] = await db.execute<IUserExtRowData[]>(query);
    return {
      success: true,
      result: userList,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '전체 유저 조회 실패',
    };
  }
}

export async function getUser(username: string): Promise<ServerRespone<IUserExtRowData>> {
  const query = 'select * from test_db where username = ?';
  try {
    const [user] = await db.execute<IUserExtRowData[]>(query, [username]);
    if (user.length === 0) {
      return {
        success: false,
        msg: '조회된 유저가 없습니다.',
      };
    }
    return {
      success: true,
      result: user[0],
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '유저 조회 실패',
    };
  }
}

export async function insertUser(newUser: IUser): Promise<ServerRespone<number>> {
  const query = 'insert into test_db (username, age) values (?,?);';
  try {
    const [foo] = await db.execute<ResultSetHeader>(query, [newUser.username, newUser.age]);
    return {
      success: true,
      result: foo.insertId,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '유저 생성 실패',
    };
  }
}

export async function updateUser(user: IUser): Promise<ServerRespone> {
  const query = 'update test_db set username=?, age=? where idx=?';
  try {
    await db.execute(query, [user.username, user.age, user.idx]);
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '유저 정보 변경 실패',
    };
  }
}

export async function deleteUser(id: number): Promise<ServerRespone> {
  const query = 'delete from test_db where idx = ?';
  try {
    await db.execute(query, [id]);
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      msg: '유저 삭제 실패',
    };
  }
}
