"use strict";
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
exports.getUserById = exports.createNewUser = exports.checkUserExistByEmail = void 0;
const models_1 = require("../models");
const checkUserExistByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ where: { email } });
    return user;
});
exports.checkUserExistByEmail = checkUserExistByEmail;
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.create(userData);
});
exports.createNewUser = createNewUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ where: { id: userId } });
    return user;
});
exports.getUserById = getUserById;
