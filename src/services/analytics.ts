import { Request } from "express";
import * as TaskRepository from "../repositories/task";
import * as helper from "../utils/helpers";
import { newError } from "../utils/apiResponses";

export const getReportTime = async (req: Request) => {
  // get all completed tasks
  const allCompletedTasks = await TaskRepository.getAllCompletedTasks();
  console.log(allCompletedTasks);
  if (allCompletedTasks.length == 0) {
    return newError("No Completed Task Found", 404);
  }

  const timedTasks = [];

  for (const task of allCompletedTasks) {
    const rawTask = task.toJSON();
    const diffInMs =
      new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
    const diffInHours = (diffInMs / (1000 * 60 * 60)).toFixed(2);

    console.log(helper.formatDuration(diffInMs));
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
