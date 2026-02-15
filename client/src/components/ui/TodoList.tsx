import { useTodos } from "@/queries/todos";
// import TodoFilters from "./TodoFilters";
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
import {
  differenceInDays,
  format,
  isPast,
  isToday,
  isTomorrow,
} from "date-fns";
import { Button } from "./button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";

export function TodoList() {
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
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
              <TableCell>
                <div
                  className={cn(
                    "font-medium text-base",
                    todo.completed && "line-through text-muted-foreground",
                  )}
                >
                  {todo.title}
                </div>
              </TableCell>
              <TableCell>
                {todo.description.length > 80 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground cursor-help">
                          {truncateText(todo.description)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-md p-3">
                        <p className="text-sm whitespace-pre-wrap">
                          {todo.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {todo.description}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {todo.priority[0].toUpperCase() + todo.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {(() => {
                    const dueDate = new Date(todo.dueDate);
                    const now = new Date();
                    const dayUntilDue = differenceInDays(dueDate, now);

                    if (isPast(dueDate) && !todo.completed) {
                      return (
                        <Badge variant="destructive" className="text-xs w-fit">
                          Overdue
                        </Badge>
                      );
                    }

                    if (isToday(dueDate)) {
                      return (
                        <Badge variant="destructive" className="text-xs w-fit">
                          Due Today
                        </Badge>
                      );
                    }

                    if (isTomorrow(dueDate)) {
                      return (
                        <Badge className="text-xs w-fit bg-orange-500 text-white whitespace-nowrap ">
                          Due Tomorrow
                        </Badge>
                      );
                    }

                    if (dayUntilDue > 0 && dayUntilDue <= 7) {
                      return (
                        <Badge variant="secondary" className="text-xs w-fit">
                          {dayUntilDue} {dayUntilDue === 1 ? "day" : "days"}{" "}
                          left
                        </Badge>
                      );
                    }

                    return (
                      <span className="text-sm">
                        {format(dueDate, "MMM dd, yyyy")}
                      </span>
                    );
                  })()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
