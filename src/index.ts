import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";
import prodctRoutes from "./routes/productRoutes";
import usersRoutes from "./routes/usersRouter";
import expenseRoutes from "./routes/expenseRoute";
// Route imports

// middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/products", prodctRoutes);
app.use("/users", usersRoutes);
app.use("/expenses", expenseRoutes);

// Server
const portNum = process.env.PORT || 3003;
app.listen(portNum, ()=>{
    console.log(`server running on port ${portNum}`)
})

