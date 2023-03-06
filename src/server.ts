import express from "express";
import { configurePassport } from "./middlewares/passport";
import setup from "./middlewares/setup";

const app = express();

setup(app);

configurePassport(app);

app.listen(process.env.PORT || 3000, () => console.log("server is up an runnin"));
