import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await params;
    const data = await req.json();
    const product = await prisma.product.update({
      where: {
        id,

      },
      data
    })

    return NextResponse.json(product);

  } catch (error) {
    return NextResponse.json({
      message: "Failed to update product",
    }, { status: 500 })
  }


}
