import { UserAttributes } from "../../interfaces/user";
import { registerUserSchema } from "./schemas";

export const registerUser = (data: UserAttributes) => {
    const { error, value } = registerUserSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    return { error, value };
}