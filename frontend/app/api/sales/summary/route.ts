import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      totalSales,
      revenue,
      products,
      customers,
    ] = await Promise.all([

      prisma.sale.count(),

      prisma.sale.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),

      prisma.saleItem.aggregate({
        _sum: {
          quantity: true,
        },
      }),

      prisma.sale.findMany({
        select: {
          customerId: true,
        },
        distinct: ["customerId"],
      }),

    ]);

    return NextResponse.json({
      totalSales,

      totalRevenue:
        revenue._sum.totalAmount ?? 0,

      totalProductsSold:
        products._sum.quantity ?? 0,

      totalCustomers:
        customers.length,
    });


  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch sales summary",
      },
      {
        status: 500,
      }
    );

  }
}
