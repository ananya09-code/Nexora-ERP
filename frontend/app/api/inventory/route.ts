import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },

    });
    return Response.json(inventory)
  } catch (error) {
    return Response.json({ error: "Failed to fetch inventory" })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const adjustment = Number(data.adjustment);

    const inventory = await prisma.inventory.update({
      where: {
        productId: data.productId,
      },
      data: {
        quantity: {
          increment: adjustment,
        },
      },
    });

    return Response.json(inventory);
  } catch (error) {
    return Response.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}

