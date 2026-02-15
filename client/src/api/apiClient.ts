import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoQueryParams {
  page?: number;
  pageSize?: number;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
  search?: string;
  sortBy?: "createdAt" | "dueDate" | "title" | "priority";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedTodosResponse {
  success: true;
  message: string;
  data: Todo[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}

export interface CreateTodoResponse {
  success: true;
  message: string;
  data: Todo;
}
