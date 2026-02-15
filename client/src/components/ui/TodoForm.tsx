import { createTodoSchema } from "@/schemas/todoSchema";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Link, redirect } from "@tanstack/react-router";
import { useCreateTodo } from "@/queries/todos";
import type z from "zod";
import { toast } from "sonner";

type FormData = z.infer<typeof createTodoSchema>;

export default function TodoForm() {
  const mutation = useCreateTodo();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date().toISOString().slice(0, 16),
      priority: "medium",
    } satisfies FormData as FormData,
    onSubmit: async ({ value }) => {
      const validatedData = createTodoSchema.parse(value);
      mutation.mutate(validatedData, {
        onError: () => {
          toast.error("Error creating the todo");
        },
      });
      toast.success("Created todo successfully");
      redirect({ to: "/" });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="mb-7">
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter todo title..."
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Description</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter todo description..."
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <div className="flex gap-3 items-center">
          <form.Field
            name="dueDate"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Due Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value ? (
                          format(new Date(field.state.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="w-60"
                        mode="single"
                        selected={
                          field.state.value
                            ? new Date(field.state.value)
                            : undefined
                        }
                        onSelect={(date) => {
                          field.handleChange(date?.toISOString() || "");
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="priority"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Priority</FieldLabel>
                  <Select defaultValue={field.state.value}>
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
      </FieldGroup>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex justify-start gap-4">
            <Link to="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
            <Button
              variant="ghost"
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                form.reset();
              }}
            >
              Reset
            </Button>
          </div>
        )}
      />
    </form>
  );
}
