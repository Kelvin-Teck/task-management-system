import { Request } from "express";
import * as validator from "../validators/users";
import { newError } from "../utils/apiResponses";
import * as UserRepository from "../repositories/user";
import * as helper from "../utils/helpers";
import * as Mailer from "../mailers";

export const register = async (req: Request) => {
  const { name, email, password, role } = req.body;
  // validate user input
  const { error, value } = validator.registerUser({
    name,
    email,
    password,
    role,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], 403);
  }

  const user = await UserRepository.checkUserExistByEmail(value.email);
  if (user) {
    return newError("This User already exist", 403);
  }

  // Hash Password
  const hashedPassword = await helper.hashPassword(value.password);

  // create user record in database
  const newUser = {
    name: value.name,
    email: value.email,
    password: hashedPassword,
    role: value.role,
  };

  await UserRepository.createNewUser(newUser);
  // send email Notification
  try {
    const emailData = {
      to: newUser.email,
      subject: "TMS Account Creation",
      template: "create-user",
      context: {
        name: newUser.name,
        loginUrl: "https://somefrontendloginurl.com",
        year: new Date().getFullYear(),
      },
    };
    await Mailer.sendMail(emailData);
  } catch (error) {
    throw error;
  }
};

export const login = async (req: Request) => {
  const { email, password } = req.body; //get user input

  // validate user input
  const { error, value } = validator.loginUser({
    email,
    password,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], 403);
  }

  //check if user exist
  const user = await UserRepository.checkUserExistByEmail(value.email);

  if (!user) {
    return newError("This User does not exist", 404);
  }

  // verify password
  const checkPassword = await helper.comparePassword(password, user.password);

  if (!checkPassword) {
    return newError("Incorrect Password...Try Again", 403);
  }

  //   const { password: pass, ...safeUser } = user; //get user without password

  const accessToken = helper.generateAccessToken(user); //generate access token

  // Send email Notification
  try {
    const emailData = {
      to: user.email,
      subject: "TMS Account Creation",
      template: "create-user",
      context: {
        name: user.name,
        securityLink: "https://somesecurityreviewurl.com",
        loginTime: new Date().getTime(),
        ipAddress: req.ip,
      },
    };

    await Mailer.sendMail(emailData);
  } catch (error) {
    throw error;
  }

  return { token: accessToken, user: { id: user.id, email: user.email } };
};
