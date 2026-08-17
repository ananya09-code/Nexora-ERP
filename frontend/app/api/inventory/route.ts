import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const stockStatus = searchParams.get("stockStatus");
    const productId = searchParams.get("productId");
    const unit = searchParams.get("unit");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const where = {
      ...(productId && {
        productId,
      }),

      ...(unit && {
        unit,
      }),

      ...(search && {
        product: {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      }),

      ...(stockStatus === "in-stock" && {
        quantity: {
          gte: 10,
        },
      }),

      ...(stockStatus === "low-stock" && {
        quantity: {
          gt: 0,
          lt: 10,
        },
      }),

      ...(stockStatus === "out-of-stock" && {
        quantity: {
          lte: 0,
        },
      }),
    };

    const [inventory, total] = await Promise.all([
      prisma.inventory.findMany({
        where,
        skip,
        take: limit,
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      }),

      prisma.inventory.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: inventory,
      meta: {
        page,
        limit,
        totalPages,
        total,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
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

