import { db } from "@/drizzle/db";
import { todos } from "@/drizzle/schema";
import { TodoQueryInput } from "@/schema/todoShemas";
import { and, asc, count, desc, eq, like, or } from "drizzle-orm";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export class TodoServices {
  async getAllTodos(
    filters: TodoQueryInput,
  ): Promise<PaginatedResponse<typeof todos.$inferSelect>> {
    const whereConditions = [];

    if (filters.completed !== undefined) {
      whereConditions.push(eq(todos.completed, filters.completed));
    }

    if (filters.priority) {
      whereConditions.push(eq(todos.priority, filters.priority));
    }

    if (filters.search) {
      const searchTerm = `%${filters.search.toLowerCase()}%`;
      whereConditions.push(
        or(like(todos.title, searchTerm), like(todos.description, searchTerm))!,
      );
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(todos)
      .where(whereClause);

    const page = filters.page;
    const pageSize = filters.pageSize;
    const offset = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalCount / pageSize);

    const sortColumn = {
      createdAt: todos.createdAt,
      dueDate: todos.dueDate,
      title: todos.title,
      priority: todos.priority,
    }[filters.sortBy];

    const orderDirection = filters.sortOrder === "asc" ? asc : desc;

    const data = await db
      .select()
      .from(todos)
      .where(whereClause)
      .orderBy(orderDirection(sortColumn))
      .limit(pageSize)
      .offset(offset);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalItems: totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
