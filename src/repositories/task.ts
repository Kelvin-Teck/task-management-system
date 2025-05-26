import { Op } from "sequelize";
import { TaskAttributes } from "../interfaces/task";
import { Task } from "../models";

export const createTask = async (data: TaskAttributes) => {
  await Task.create(data);
};

export const getAllTasks = async (filters: any) => {
  const { title, status, page = 1, limit = 10 } = filters;
  const query: any = {};

  // Dynamically build the query object based on provided filters
  if (title) {
    query.title = { [Op.iLike]: `%${title}%` }; // Assuming 'title' is a field in the Task model
  }

  if (status) {
    query.status = status; // Assuming 'status' is a field in the Task model
  }

  const offset = (page - 1) * limit;

  const allTasks = await Task.findAll({
    where: query,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  const total = allTasks.length;

  return {
    tasks: allTasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTaskById = async (id: string) => {
  const task = await Task.findByPk(id);

  return task;
};

export const updateTask = async (id: string, data: any) => {
  await Task.update(data, { where: { id } });
  return;
};

export const deleteTask = async (id: string) => {
  await Task.destroy({ where: { id } });
  return;
};

export const getAllCompletedTasks = async () => {
  const completedTasks = await Task.findAll({
    where: { status: "completed" },
    order: [["createdAt", "DESC"]],
  });

  return completedTasks;
};
