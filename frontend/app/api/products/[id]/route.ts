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
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}

