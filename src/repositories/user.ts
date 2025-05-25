import { UserAttributes } from "../interfaces/user";
import { User } from "../models";

export const checkUserExistByEmail = async (
  email: string
): Promise<UserAttributes | null> => {
  const user = await User.findOne({ where: { email } });

  return user;
};

export const createNewUser = async (userData: UserAttributes) => {
  await User.create(userData);
};
