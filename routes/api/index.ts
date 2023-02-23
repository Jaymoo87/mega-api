import express from "express";
import passport from "passport";

const apiRouter = express.Router();

apiRouter.get("/wow", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Nice!" });
});

export default apiRouter;
