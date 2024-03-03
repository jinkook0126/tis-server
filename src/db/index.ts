import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const connection = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 30,
});

// const promisePool = connection.promise();
export default connection;

// export default () => {
//   const connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     connectionLimit: 30,
//   });

//   return connection.promise();
// };
// import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST, // 호스트 주소
//   user: process.env.DB_USER, // mysql user
//   password: process.env.DB_PASSWORD, // mysql password
//   database: process.env.DB_DATABASE, // mysql 데이터베이스
//   port: 3306,
// });

// export const db = pool.promise();

// import { createPool } from 'mysql2/promise';

// export default () => {
//   const connection = createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     connectionLimit: 30,
//   });

//   return connection;
// };
