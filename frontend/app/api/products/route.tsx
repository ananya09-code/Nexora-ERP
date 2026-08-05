import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  });

  return NextResponse.json(products);
}



export async function POST(req: Request) {
  try {

    const data = await req.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        barcode: data.barcode,
        description: data.description,
        price: data.price,
        costPrice: data.costPrice,
        categoryId: data.categoryId,

        inventory: {
          create: {
            quantity: 0,
            minStock: 5,
            unit: "pcs",
          },
        },
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
