import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){

  const categories = await prisma.category.findMany();

  return NextResponse.json(categories);

}


export async function POST(req:Request) {
   try {
   const body= await req.json() 
   const categories= await prisma.category.create({
   data:{name: body.name,
         description:body.description
   }
   })

    return NextResponse.json(categories, {
      status: 201,
    });
   } catch (error) {
   console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create categore",
        details: String(error)
      },
      {
        status: 500,
      }
    ) 
   } 
}