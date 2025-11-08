"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const validator = __importStar(require("../validators/users"));
const apiResponses_1 = require("../utils/apiResponses");
const UserRepository = __importStar(require("../repositories/user"));
const helper = __importStar(require("../utils/helpers"));
const Mailer = __importStar(require("../mailers"));
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
        return (0, apiResponses_1.newError)(errorMessages[0], 403);
    }
    const user = yield UserRepository.checkUserExistByEmail(value.email);
    if (user) {
        return (0, apiResponses_1.newError)("This User already exist", 403);
    }
    // Hash Password
    const hashedPassword = yield helper.hashPassword(value.password);
    // create user record in database
    const newUser = {
        name: value.name,
        email: value.email,
        password: hashedPassword,
        role: value.role,
    };
    yield UserRepository.createNewUser(newUser);
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
        yield Mailer.sendMail(emailData);
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; //get user input
    // validate user input
    const { error, value } = validator.loginUser({
        email,
        password,
    });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return (0, apiResponses_1.newError)(errorMessages[0], 403);
    }
    //check if user exist
    const user = yield UserRepository.checkUserExistByEmail(value.email);
    if (!user) {
        return (0, apiResponses_1.newError)("This User does not exist", 404);
    }
    // verify password
    const checkPassword = yield helper.comparePassword(password, user.password);
    if (!checkPassword) {
        return (0, apiResponses_1.newError)("Incorrect Password...Try Again", 403);
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
        yield Mailer.sendMail(emailData);
    }
    catch (error) {
        throw error;
    }
    return { token: accessToken, user: { id: user.id, email: user.email } };
});
exports.login = login;
