import { RowDataPacket } from 'mysql2/promise';

export interface ServerRespone<T = undefined> {
  success: boolean;
  msg?: string;
  result?: T;
}
export interface NewUser {
  username: string;
  age: number;
}

export interface UserList extends RowDataPacket {
  idx: number;
  username: string;
  age: number;
}
