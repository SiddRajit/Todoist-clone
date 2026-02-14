import { Button } from "@/components/ui/button";
import { TodoList } from "@/components/ui/TodoList";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto p-8">
      <div className=" flex justify-between items-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Todos</h1>
          <p>Manage and organize your tasks effeciently</p>
        </div>
        <div>
          <Link to="/create">
            <Button size="icon">
              <Plus />
            </Button>
          </Link>
        </div>
      </div>
      <TodoList />
    </div>
  );
}
