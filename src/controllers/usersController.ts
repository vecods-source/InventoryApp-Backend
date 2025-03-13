import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";

const Prisma = new PrismaClient();

export const getUsers = async (req:Request,res:Response):Promise<void>=>{
    try{
        const Users = await Prisma.users.findMany();
        res.status(200).json(Users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching data"})
    }
}