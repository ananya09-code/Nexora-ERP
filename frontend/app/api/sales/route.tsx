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


  try {

    const sales = await prisma.sale.findMany({
      where: {
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

        // Statu    ...(status && {status,}),

        // Search customer name, product name, or SKU
        ...(search && {
          OR: [
            {
              customer: {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              customer: {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              items: {
                some: {
                  product: {
                    name: {
                      contains: search,
                      mode: "insensitive",
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
                      mode: "insensitive",
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
      },

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
    });
    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch purchases",
        details: String(error),
      },
      {
        status: 500,
      }

    )

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







