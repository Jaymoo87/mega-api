export type UserRoles = "user" | "admin";

export type UserLocatableColumns = "id" | "username" | "email" | "";

export interface User extends BaseUser {
  created_at: string | Date;
  updated_at: string | Date;
  is_verified: boolean;
  roles: UserRoles[];
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
}

export interface BaseItem {
  id: string;
  userid: string;
  content: string;
}

export interface Item extends BaseItem {
  completed: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}
