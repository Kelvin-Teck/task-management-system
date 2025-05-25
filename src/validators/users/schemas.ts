import Joi from "joi";
import { UserRole } from "../../interfaces/user";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 100 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Must be a valid email address",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  role: Joi.string()
    .valid(UserRole.ADMIN, UserRole.USER)
    .default(UserRole.USER)
    .messages({
      "any.only": "Role must be either 'admin' or 'user'",
    }),
});



export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
