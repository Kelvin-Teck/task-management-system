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
const helper = __importStar(require("../utils/helpers"));
("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const usersData = [
                {
                    id: 1,
                    name: "Alice Johnson",
                    email: "alice@example.com",
                    password: "hashed_password_1",
                },
                {
                    id: 2,
                    name: "Bob Smith",
                    email: "bob@example.com",
                    password: "hashed_password_2",
                },
                {
                    id: 3,
                    name: "Charlie Brown",
                    email: "charlie@example.com",
                    password: "hashed_password_3",
                },
                {
                    id: 4,
                    name: "Diana Prince",
                    email: "diana@example.com",
                    password: "hashed_password_4",
                },
                {
                    id: 5,
                    name: "Ethan Hunt",
                    email: "ethan@example.com",
                    password: "hashed_password_5",
                },
                {
                    id: 6,
                    name: "Fiona Gallagher",
                    email: "fiona@example.com",
                    password: "hashed_password_6",
                },
                {
                    id: 7,
                    name: "George Wilson",
                    email: "george@example.com",
                    password: "hashed_password_7",
                },
                {
                    id: 8,
                    name: "Hannah Montana",
                    email: "hannah@example.com",
                    password: "hashed_password_8",
                },
                {
                    id: 9,
                    name: "Isaac Newton",
                    email: "isaac@example.com",
                    password: "hashed_password_9",
                },
                {
                    id: 10,
                    name: "Jenny Lee",
                    email: "jenny@example.com",
                    password: "hashed_password_10",
                },
            ];
            const users = yield Promise.all(usersData.map((user) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, user), { password: yield helper.hashPassword(user.password), createdAt: now, updatedAt: now }));
            })));
            yield queryInterface.bulkInsert("users", users, {});
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("users", {}, {});
        });
    },
};
