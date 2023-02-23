import express from "express";
import setup from "../middlewares/setup";

const app = express();

setup(app);

app.listen(process.env.PORT || 3000, () => console.log("server is up an runnin"));
