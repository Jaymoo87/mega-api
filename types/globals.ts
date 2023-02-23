import { User as Iuser, UserRoles } from "./models";

export {};

declare global {
  namespace Express {
    interface User extends Iuser {}
  }
}

export interface Payload {
  id: string;
  email: string;
  name: string;
  roles: UserRoles[];
}
