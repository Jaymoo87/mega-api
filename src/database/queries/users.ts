import { Query } from "..";
import { BaseUser, User, UserLocatableColumns } from "../../types/models/auth";

const register = (newUser: BaseUser) => Query("INSERT INTO Users SET ?", "megaauth", [newUser]);
const find = (column: UserLocatableColumns, value: string) =>
  Query<User[]>("SELECT * FROM Users WHERE ??=?", "megaauth", [column, value]);

export default {
  register,
  find,
};
