import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req:Request,
    res:Response
):Promise<void> =>{
    try
    {
        const popularProducts = await Prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const salesSummary = await Prisma.salesSummary.findMany({
            take:5,
            orderBy: {
                date: "desc",
            }
        });
        const purchaseSummary = await Prisma.purchaseSummary.findMany({
            take: 15,
            orderBy: {
                date: "desc",
            },
        });
        const expenseSummary = await Prisma.expenseSummary.findMany({
            take:5,
            orderBy: {
                date: "desc",
            }
        });
        const expenseByCategorySummaryRaw = await Prisma.expenseByCategory.findMany({
            take:5,
            orderBy: {
                date: "desc",
            }
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item)=>({
                ...item,
                amount: item.amount.toString()
            })
        )
        console.log("Querying Succeded")
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        })

    }catch(err){
        res.status(500).json({message:"Error retrieving dashboard metrics"})
        console.log(err)
    }
}