import { z } from "zod";

export const PriorityEnum = z.enum(["low", "medium", "high"]);

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title is too long")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long")
    .trim(),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Invalid date format"),
  priority: PriorityEnum.default("medium"),
});
