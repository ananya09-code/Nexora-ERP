import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("ARCHIVE CUSTOMER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to archive customer" },
      { status: 500 }
    );
  }
}
