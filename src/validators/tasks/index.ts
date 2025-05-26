import { TaskAttributes } from "../../interfaces/task";
import { createTaskSchema, updateTaskSchema } from "./schemas";

export const createTask = (data: TaskAttributes) => {
    const { error, value } = createTaskSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    return { error, value };
}

export const updateTask = (data:any) => {
    const { error, value } = updateTaskSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    return { error, value };
}