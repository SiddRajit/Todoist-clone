import { db } from "@/drizzle/db";
import { todos } from "@/drizzle/schema";

export const getTodos = async (req, res) => {
  const result = db.select().from(todos);
  res.status(200).json({
    message: "Todos fetched successfully",
  });
};
