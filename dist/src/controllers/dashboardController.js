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
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularProducts = yield Prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const salesSummary = yield Prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            }
        });
        const purchaseSummary = yield Prisma.purchaseSummary.findMany({
            take: 15,
            orderBy: {
                date: "desc",
            },
        });
        const expenseSummary = yield Prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            }
        });
        const expenseByCategorySummaryRaw = yield Prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            }
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        console.log("Querying Succeded");
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
        console.log(err);
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
