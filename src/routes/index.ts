import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/api", apiRouter);

export default indexRouter;
