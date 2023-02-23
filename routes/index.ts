import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import loginRouter from "./auth/login";

const indexRouter = express.Router();

indexRouter.use("/register", authRouter);
indexRouter.use("/api", apiRouter);
indexRouter.use("/login", loginRouter);

export default indexRouter;
