import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const TodosPriorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 200 }).notNull(),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  dueDate: timestamp("dueDate").notNull(),
  priority: TodosPriorityEnum("priority").notNull().default("medium"),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
