import { Request } from "express";
import * as validator from '../validators/users' 
import { newError } from "../utils/apiResponses";
import * as  UserRepository from '../repositories/user'
import * as helper  from "../utils/helpers";

export const register = async (req: Request) => {
    const { name, email, password, role } = req.body;
    // validate user input 
    const { error, value } = validator.registerUser({ name, email, password, role });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);

        return newError(errorMessages[0], 403);
    }

    const user = await UserRepository.checkUserExistByEmail(value.email)
    

    if (user) {
        return newError('This User already exist', 403)
    }

    // Hash Password
    const hashedPassword = await helper.hashPassword(value.password);

    // create user record in database 
    const newUser = {
        name: value.name,
        email: value.email,
        password: hashedPassword,
        role: value.role
    }

    await UserRepository.createNewUser(newUser)
}