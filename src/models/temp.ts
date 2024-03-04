import { RowDataPacket } from 'mysql2/promise';

export interface IUser {
  idx?: number;
  username: string;
  age: number;
}

export interface IUserExtRowData extends IUser, RowDataPacket {}
