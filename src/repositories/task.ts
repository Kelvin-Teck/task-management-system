import { Op } from "sequelize";
import { TaskAttributes } from "../interfaces/task";
import { Task } from "../models";
import { off } from "process";

export const createTask = async (data: TaskAttributes) => {
  await Task.create(data);
  return;
};

export const getAllTasks = async (filters: any) => {
  
  const { title, status, page, limit = 10 } = filters;
  const currentPage = parseInt(page) || 1; 

  const query: any = {};

  // Dynamically build the query object based on provided filters
  if (title) {
    query.title = { [Op.iLike]: `%${title}%` }; // Assuming 'title' is a field in the Task model
  }

  if (status) {
    query.status = status; // Assuming 'status' is a field in the Task model
  }

  const offset = (currentPage - 1) * limit;
  

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

export const getAllCompletedTasksByUser = async (userId: string) => {
  const completedTasks = await Task.findAll({
    where: { userId, status: "completed" },
  });

  return completedTasks;
};

export const getAllTasksByUser = async (userId: string) => {
  const completedTasks = await Task.findAll({
    where: { userId },
  });

  return completedTasks;
};

export const findTaskByTitle = async (title: string) => {
  const task = await Task.findOne({ where: { title } });

  return task;
}