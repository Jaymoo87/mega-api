import dotenv from "dotenv";

dotenv.config();

export interface DBConfig {
  user: string;
  password: string;
  host: string;
  database: string;
}

export type db_keys = "auth" | "pets";

export const sql = {
  auth: {
    user: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME,
    host: process.env.AUTH_DB_HOST,
  },
  pets: {
    user: process.env.PETS_DB_USER,
    password: process.env.PETS_DB_PASSWORD,
    database: process.env.PETS_DB_NAME,
    host: process.env.PETS_DB_HOST,
  },
} as { [key: string]: DBConfig };

if (!process.env.TOKEN_KEY) {
}

export const token = {
  key: process.env.TOKEN_KEY,
  expiration: process.env.TOKEN_EXPIRATION,
};
