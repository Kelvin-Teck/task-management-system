import { Request } from "express";
import * as validator from "../validators/tasks";
import { newError } from "../utils/apiResponses";
import * as TaskRepository from "../repositories/task";

export const createTask = async (req: Request) => {
  const userId = typeof req.user === "object" ? req.user.id : null;

  const { title, description, status } = req.body; //get user input
  // validate input
  const { error, value } = validator.createTask({
    title,
    description,
    userId,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], 403);
  }

  //   add new task to database
  const newTask = {
    title: value.title,
    description: value.description,
    userId: value.userId,
  };

  await TaskRepository.createTask(newTask);
};

export const getAllTasks = async (req: Request) => {
  const { title, status, page } = req.query;
  const allTasks = await TaskRepository.getAllTasks({ title, status, page });

  if (allTasks.tasks.length == 0) {
    return newError("You do not have any task at the moment", 404);
  }

  return allTasks;
};

export const updateTask = async (req: Request) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const { error, value } = validator.updateTask({
    title,
    description,
    status,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], 403);
  }

  const task = await TaskRepository.getTaskById(id);

  if (!task) {
    return newError("Sorry this Task does not exist", 404);
  }
  // update task
  const updateData = {
    title: value.title,
    description: value.description,
    status: value.status,
  };

  await TaskRepository.updateTask(id, updateData);
};

export const deleteTask = async (req: Request) => {
  const { id } = req.params;

  const task = await TaskRepository.getTaskById(id);

  if (!task) {
    return newError("Sorry this Task does not exist", 404);
  }

  await TaskRepository.deleteTask(id);
};
