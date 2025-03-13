"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const expenseRoute_1 = __importDefault(require("./routes/expenseRoute"));
// Route imports
// middlewares
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use("/dashboard", dashboardRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/users", usersRouter_1.default);
app.use("/expenses", expenseRoute_1.default);
// Server
const portNum = process.env.PORT || 3003;
app.listen(portNum, () => {
    console.log(`server running on port ${portNum}`);
});
