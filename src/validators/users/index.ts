import { UserAttributes } from "../../interfaces/user";
import { loginUserSchema, registerUserSchema } from "./schemas";

export const registerUser = (data: UserAttributes) => {
    const { error, value } = registerUserSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    return { error, value };
}

export const loginUser = (data: {email: string, password: string}) => {
  const { error, value } = loginUserSchema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  return { error, value };
};