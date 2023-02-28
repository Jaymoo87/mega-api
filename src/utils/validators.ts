import { Response } from "express";

interface ReqBod {
  [key: string]: string | number | boolean | undefined;
}

export const hasMissingData = (data: ReqBod, res: Response) => {
  const entries = Object.entries(data);

  if (Object.values(data).some((val) => val === undefined)) {
    const missingProperties = Object.values;

    res.status(400).json({ message: "missing some info" });
    return true;
  }
  return false;
};

export const isEmail = (email: string) => {
  const pattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return !!email.match(pattern);
};

export const isEmailFormat = (email: string, res: Response) => {
  if (!isEmail(email)) {
    res.status(400).json({ message: "your  email addres isnt quite right" });
    return true;
  } else {
    return false;
  }
};

export const isUserNameFormat = (username: string, res: Response) => {
  if (isEmail(username)) {
    res.status(400).json({ message: "your username cannot be an email address" });
    return true;
  } else {
    return false;
  }
};
