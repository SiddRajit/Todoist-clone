import {
  apiClient,
  type CreateTodoInput,
  type CreateTodoResponse,
  type PaginatedTodosResponse,
  type TodoQueryParams,
} from "./apiClient";

export const todosApi = {
  getTodos: async (
    params: TodoQueryParams = {},
  ): Promise<PaginatedTodosResponse> => {
    const { data } = await apiClient.get("/todos", { params });
    return data;
  },

  createTodo: async (input: CreateTodoInput): Promise<CreateTodoResponse> => {
    const { data } = await apiClient.post("todos", input);
    return data;
  },
};
