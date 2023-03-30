import dotenv from "dotenv";

dotenv.config();

export interface DBConfig {
  user: string;
  password: string;
  host: string;
  database: string;
}

export type db_keys = "auth" | "pets" | "todo";

export const sql = {
  auth: {
    user: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME,
    host: process.env.AUTH_DB_HOST,
    port: process.env.AUTH_DB_PORT,
  },
  pets: {
    user: process.env.PETS_DB_USER,
    password: process.env.PETS_DB_PASSWORD,
    database: process.env.PETS_DB_NAME,
    host: process.env.PETS_DB_HOST,
    port: process.env.PETS_DB_PORT,
  },
  todo: {
    user: process.env.TODO_DB_USER,
    password: process.env.TODO_DB_PASSWORD,
    database: process.env.TODO_DB_NAME,
    host: process.env.TODO_DB_HOST,
    port: process.env.TODO_DB_PORT,
  },
} as { [key: string]: DBConfig };

if (!process.env.TOKEN_KEY) {
  console.log("fail, token key ain't right");
  process.exit(1);
}

export const token = {
  key: process.env.TOKEN_KEY,
  expiration: process.env.TOKEN_EXPIRATION,
};
