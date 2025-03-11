import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";

const Prisma = new PrismaClient();

export const getProducts = async (req:Request,res:Response):Promise<void>=>{
    try{
        const search = req.query.search?.toString();
        const prodcuts = await Prisma.products.findMany({
            where: {
                name:{
                    contains: search,
                },
            },
        });
        console.log("product retrived")
        res.status(201).json(prodcuts);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "error fetcing data"})
    }
}

export const createProduct = async (req:Request,res:Response):Promise<void>=>{
    try{const {productId, name, price, rating, stockQuantity} = req.body;
    const product = await Prisma.products.create({
        data:{
            productId,
            name,
            price,
            rating,
            stockQuantity
        }
    })
    res.status(201).json(product)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Error creating product. Product couldnot be added error: 500"})
    }
}