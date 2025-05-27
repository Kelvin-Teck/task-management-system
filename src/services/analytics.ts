import { Request } from "express";
import * as TaskRepository from "../repositories/task";
import * as UserRepository from "../repositories/user";
import * as helper from "../utils/helpers";
import { newError } from "../utils/apiResponses";

export const getReportTime = async (req: Request) => {
  // get all completed tasks
  const allCompletedTasks = await TaskRepository.getAllCompletedTasks();
console.log({allCompletedTasks})
  if (allCompletedTasks.length == 0) {
    return newError("No Completed Task Found", 404);
  }

  const timedTasks = [];

  for (const task of allCompletedTasks) {
    const rawTask = task.toJSON();
    const diffInMs =
      new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
    const diffInHours = (diffInMs / (1000 * 60 * 60)).toFixed(2);

    const taskWithTime = {
      ...rawTask,
      timeSpent: {
        hours: parseFloat(diffInHours),
        humanReadable: helper.formatDuration(diffInMs),
      },
    };
    timedTasks.push(taskWithTime);
  }
  const sortedTasks = timedTasks.sort(
    (a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  );
  return sortedTasks;
};

export const getCompletedTaskRate = async (req: Request) => {
  const userId = typeof req.user === "object" ? req.user.id : null;

  const user = await UserRepository.getUserById(userId);

  // get all Task of user
  const userTasks = await TaskRepository.getAllTasksByUser(userId);

  if (userTasks.length == 0) {
    return newError("You do have not any Task", 404);
  }

  // get all completed task by user
  const completedTasks = await TaskRepository.getAllCompletedTasksByUser(
    userId
  );

  if (completedTasks.length == 0) {
    return newError("You have so far not completed any Task", 404);
  }

  const completedTaskRate = (completedTasks.length / userTasks.length) * 100;

  const formattedResponse = {
    name: user?.name,

    taskRate: parseFloat(completedTaskRate.toFixed(2)),
  };
  return formattedResponse;
};
