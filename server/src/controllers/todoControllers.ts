import {
  createTodoSchema,
  todoIdSchema,
  todoQuerySchema,
  updateTodoSchema,
} from "@/schema/todoShemas";
import { TodoServices } from "@/services/todoServices";
import { NextFunction, Request, Response } from "express";
const todoService = new TodoServices();

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedQuery = todoQuerySchema.parse(req.query);
    const result = await todoService.getAllTodos(validatedQuery);
    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching todos",
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);
    const newTodo = await todoService.createTodo(validatedData);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating todos",
    });
    console.log(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = todoIdSchema.parse(req.params);
    const validatedData = updateTodoSchema.parse(req.body);
    const updatedTodo = await todoService.updateTodo(id, validatedData);

    if (!updatedTodo) {
      return res.status(404).json({
        succcess: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating todos",
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = todoIdSchema.parse(req.params);
    const deletedTodo = await todoService.deleteTodo(id);

    if (!deletedTodo) {
      return res.status(404).json({
        succcess: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting todos",
    });
  }
};
