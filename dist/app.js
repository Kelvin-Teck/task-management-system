"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server up and running!!!");
});
app.use("/auth", auth_1.default);
app.use("/task", task_1.default);
app.use('/analytics', analytics_1.default);
exports.default = app;
