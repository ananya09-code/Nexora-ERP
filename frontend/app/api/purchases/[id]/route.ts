
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await params;
    const data = await req.json();
    const purchase = await prisma.purchase.update({
      where: {
        id,

      },
      data
    })

    return NextResponse.json(purchase);

  } catch (error) {
    return NextResponse.json({
      message: "Failed to update purchase",
    }, { status: 500 })
  }


}
