import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const customerId = searchParams.get("customerId");
  const productId = searchParams.get("productId");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");
  const createdAt = searchParams.get("createdAt");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  try {
    const where = {
      // Customer filter
      ...(customerId && {
        customerId,
      }),

      // Product filter
      ...(productId && {
        items: {
          some: {
            productId,
          },
        },
      }),

      // Search customer name, product name, or SKU
      ...(search && {
        OR: [
          {
            customer: {
              firstName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
          {
            customer: {
              lastName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
          {
            items: {
              some: {
                product: {
                  name: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
            },
          },
          {
            items: {
              some: {
                product: {
                  sku: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
            },
          },
        ],
      }),

      // Amount range
      ...((minAmount || maxAmount) && {
        totalAmount: {
          ...(minAmount && {
            gte: Number(minAmount),
          }),
          ...(maxAmount && {
            lte: Number(maxAmount),
          }),
        },
      }),

      // Created date
      ...(createdAt && {
        createdAt: {
          gte: new Date(createdAt),
        },
      }),
    };

    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        where, skip,
        take: limit,

        include: {
          customer: true,

          items: {
            include: {
              product: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.sale.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: sales,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to fetch sales:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch sales",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(req: Request) {
  try {
    const data = await req.json()

    const totalAmount = data.item.reduce(
      (total: any, num: any) => total + num.quantity * num.price,
      0
    );

    const sale = await prisma.sale.create({
      data: {
        customerId: data.customerId,
        status: data.status ?? "completed",
        totalAmount,

        items: {
          create: data.item.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return Response.json(sale)


  } catch (error) {
    Response.json({

      message: "Failed to add the sale"
    }, { status: 500 })
  }
}







