import express from "express";

const todoRouter = express.Router();

todoRouter.get("/");
todoRouter.post("/");
todoRouter.put("/:id");
todoRouter.delete("/:id");

export default todoRouter;
