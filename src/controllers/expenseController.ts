import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const getExpensesByCategory = async (
    req:Request,
    res:Response
):Promise<void> =>{
    try
    {
        const expenseByCategorySummaryRaw = await Prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc",
            },
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item)=>({
            ...item,
            amount: item.amount.toString()
        }));
        res.status(200).json(expenseByCategorySummary);
        
    }catch(err){
        res.status(500).json({message:"Error retrieving expenses data"})
        console.log(err)
    }
}