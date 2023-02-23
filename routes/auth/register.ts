import express from "express";

import { MysqlError } from "mysql";
import { v4 } from "uuid";
import { hasMissingData, isEmail, isEmailFormat } from "../../utils/validators";

import users from "../../database/queries/users";
import { hash } from "../../utils/bcrypt";
import { sign } from "../../utils/token";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, username, password } = req.body;
  const newUser = { name, email, username, password };
  hasMissingData(newUser, res);
  const hashed = await hash(password);

  if (hasMissingData(newUser, res)) return;
  // if(!isEmailFormat(email, res)) return;
  // if(!isUserNameFormat(newUser, res)) return

  try {
    const id = v4();
    newUser.password = await hash(password);

    await users.register({ id, ...newUser });

    const token = sign({ id, email, name, roles: ["user"] });
    res.status(201).json({ id, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    const err = error as unknown as MysqlError;
    res.status(500).json({ message: err.sqlMessage });
  }
});

export default registerRouter;
