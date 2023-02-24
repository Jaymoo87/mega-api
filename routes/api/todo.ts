import express from "express";
import { v4 } from "uuid";
import Items from "../../database/queries/todo";

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unable to auathenticate user" });

  try {
    const items = await Items.all(req.user.id);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " server fucked" });
  }
});

todoRouter.post("/", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unable to auathenticate user" });

  const { content } = req.body;
  if (!content) return res.status(401).json({ message: "Unable to auathenticate user" });

  const id = v4();

  try {
    const newItem = { id, userid: req.user.id, content };
    await Items.create(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " server fucked" });
  }
});

todoRouter.put("/:id/toggle", async (req, res) => {
  const id = req.params.id;
  const { current_status } = req.body;
  if (!req.user) return res.status(401).json({ message: "Unable to auathenticate user" });

  try {
    await Items.toggle_completion(current_status, id, req.user.id);
    res.status(201).json({ message: "successfully updated item!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " server fucked" });
  }
});

todoRouter.delete("/:id", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unable to auathenticate user" });

  try {
    await Items.all(req.user.id);
    res.json({ message: "Deleted AF!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " server fucked" });
  }
});
