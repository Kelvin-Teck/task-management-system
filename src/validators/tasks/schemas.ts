import Joi from "joi";
import { TaskStatus } from "../../interfaces/task"; // Adjust the import path if needed

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 255 characters",
  }),

  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),

  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .default(TaskStatus.PENDING)
    .messages({
      "any.only": `Status must be one of: ${Object.values(TaskStatus).join(
        ", "
      )}`,
    }),

  userId: Joi.number().integer().positive().required().messages({
    "number.base": "userId must be a number",
    "number.integer": "userId must be an integer",
    "number.positive": "userId must be a positive number",
  }),

  timeSpent: Joi.number().integer().min(0).default(0).messages({
    "number.base": "timeSpent must be a number",
    "number.min": "timeSpent cannot be negative",
  }),
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().min(3).optional(),
  status: Joi.string().valid("pending", "in_progress", "completed").optional(),
});