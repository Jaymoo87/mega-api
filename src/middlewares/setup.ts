import { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import indexRouter from "../routes";
import cors from "cors";

export default function configure(app: Express) {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());

  app.use(express.json());
  app.use(indexRouter);
}
