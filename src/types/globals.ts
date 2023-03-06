import { UserRoles, User as IUser } from "./models/auth";

export {};

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export interface Payload {
  id: string;
  email: string;
  name: string;
  roles: UserRoles[];
}
