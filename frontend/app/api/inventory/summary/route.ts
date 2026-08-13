import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


//get inventory summary
export async function GET() {
  try {
    const [totalProducts, outOfStock, lowStock] = await Promise.all([
      prisma.inventory.count(),

      prisma.inventory.count({
        where: {
          quantity: {
            lte: 0,
          },
        },
      }),

      prisma.inventory.count({
        where: {
          quantity: {
            gt: 0,
            lt: 10,
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      outOfStock,
      lowStock,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}

