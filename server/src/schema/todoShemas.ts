import { z } from "zod";

export const PriorityEnum = z.enum(["low", "medium", "high"]);
export const SortOrderEnum = z.enum(["asc", "desc"]);
export const TodoSortFieldEnum = z.enum([
  "createdAt",
  "dueDate",
  "title",
  "priority",
]);

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
    .datetime()
    .transform((val) => new Date(val)),
  priority: PriorityEnum.default("medium"),
  completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title is too long")
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long")
    .trim()
    .optional(),
  dueDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
  priority: PriorityEnum.default("medium").optional(),
  completed: z.boolean().optional(),
});

export const todoQuerySchema = z.object({
  completed: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
  search: z.string().min(1).trim().optional(),
  priority: PriorityEnum.optional(),
  sortBy: TodoSortFieldEnum.default("createdAt"),
  sortOrder: SortOrderEnum.default("desc"),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1))
    .default(1),
  pageSize: z
    .string()
    .default("10")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(100)),
});

export const todoIdSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoQueryInput = z.infer<typeof todoQuerySchema>;
