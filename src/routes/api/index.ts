import express from "express";
import passport from "passport";
import todoRouter from "./todo";

const apiRouter = express.Router();

apiRouter.get("/wow", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Nice!" });
});

apiRouter.use("/todo", todoRouter);

export default apiRouter;
