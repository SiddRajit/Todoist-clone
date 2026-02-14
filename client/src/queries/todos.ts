import type { CreateTodoInput, TodoQueryParams } from "@/api/apiClient";
import { todosApi } from "@/api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTodos = (params: TodoQueryParams = {}) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => todosApi.getTodos(params),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => todosApi.createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
