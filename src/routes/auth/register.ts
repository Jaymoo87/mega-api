import express from "express";

import { MysqlError } from "mysql";
import { v4 } from "uuid";
import { hasMissingData, isEmailFormat, isUserNameFormat } from "../../utils/validators";

import users from "../../database/queries/users";
import { hash } from "../../utils/bcrypt";
import { sign } from "../../utils/token";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, username, password } = req.body;
  const newUser = { name, email, username, password };
  hasMissingData(newUser, res);

  // if (hasMissingData(newUser, res)) return;
  // if (!isEmailFormat(email, res)) return;
  // if (!isUserNameFormat(username, res)) return;
  console.log(newUser);

  try {
    const id = v4();
    newUser.password = await hash(password);
    const token = sign({ id, email, name, roles: ["user"] });

    await users.register({ id, ...newUser });

    return res.status(201).json({ id, message: "Registered successfully", token });
  } catch (error) {
    console.log(error);
    const err = error as unknown as MysqlError;
    res.status(500).json({ message: err.sqlMessage });
  }
});

export default registerRouter;

// function isUserNameFormat(
//   newUser: { name: any; email: any; username: any; password: any },
//   res: Response<any, Record<string, any>, number>
// ) {
//   throw new Error("Function not implemented.");
// }
