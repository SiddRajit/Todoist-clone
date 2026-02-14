import type { TodoQueryParams } from "@/api/apiClient";

interface TodoFiltersProps {
  filters: TodoQueryParams;
  onFiltersChange: (filters: TodoQueryParams) => void;
}

function TodoFilters({ filters, onFiltersChange }: TodoFiltersProps) {
  return <div>TodoFilters</div>;
}

export default TodoFilters;
