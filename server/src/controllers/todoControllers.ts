import { db } from "@/drizzle/db";
import { todos } from "@/drizzle/schema";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  const result = await db.select().from(todos);
  res.status(200).json({
    message: "Todos fetched successfully",
    todos: result,
  });
};
