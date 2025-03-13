import express from "express";
import {getExpensesByCategory} from "../controllers/expenseController";

const router = express.Router();

router.get("/",getExpensesByCategory);

export default router