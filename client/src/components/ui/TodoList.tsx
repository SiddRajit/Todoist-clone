import { useTodos } from "@/queries/todos";
import TodoFilters from "./TodoFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
import { format } from "date-fns";
import { Button } from "./button";
import { Edit, Trash2 } from "lucide-react";

export function TodoList() {
  const { data } = useTodos();
  const todos = data?.data;
  console.log(data);

  return (
    <div className="space-y-6">
      {/* <TodoFilters filters={filters} onFiltersChange={setFilters} /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Complete</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                <Checkbox checked={todo.completed} />
              </TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {todo.priority[0].toUpperCase() + todo.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {todo.dueDate
                  ? format(new Date(todo.dueDate), "MMM dd, yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  size="icon"
                  className="bg-blue-500 size-8 hover:bg-blue-400"
                >
                  <Edit />
                </Button>
                <Button
                  size="icon"
                  className="bg-red-500 size-8 hover:bg-red-400"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
