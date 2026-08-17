import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const productId = searchParams.get("productId");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const where = {
      ...(productId && {
        id: productId,
      }),

      ...(categoryId && {
        categoryId,
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            sku: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),

      ...(minPrice && {
        price: {
          gte: Number(minPrice),
        },
      }),

      ...(maxPrice && {
        price: {
          lte: Number(maxPrice),
        },
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,

        skip,
        take: limit,

        include: {
          category: true,
          inventory: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: products,
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
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
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
