import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){

  const products = await prisma.product.findMany({
    include:{
      category:true
    }
  });

  return NextResponse.json(products);
}



export async function POST(req: Request) {
  try {

    const body = await req.json();

    console.log(body);

    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        description: body.description,
        price: Number(body.price),
        costPrice: Number(body.costPrice),
        categoryId: body.categoryId,
      },
    });


    return NextResponse.json(product, {
      status: 201,
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create product",
        details: String(error)
      },
      {
        status: 500,
      }
    );
  }
}