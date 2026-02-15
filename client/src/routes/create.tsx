import TodoForm from "@/components/ui/TodoForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container p-7 min-h-screen  w-full mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create a new todo</h1>
        <Link to="/" className="hover: underline">
          Back to todos
        </Link>
      </div>
      <TodoForm />
    </div>
  );
}
