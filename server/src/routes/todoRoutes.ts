import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/controllers/todoControllers";
import express from "express";

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
