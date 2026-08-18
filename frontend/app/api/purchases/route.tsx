import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
// CREATE PURCHASE
//
// GET ALL PURCHASES
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const supplierId = searchParams.get("supplierId");
  const productId = searchParams.get("productId");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  try {
    const where = {
      // Product filter
      ...(productId && {
        items: {
          some: {
            productId,
          },
        },
      }),

      // Supplier filter
      ...(supplierId && {
        supplierId,
      }),

      // Search supplier name, product name, or SKU
      ...(search && {
        OR: [
          {
            supplier: {
              name: {
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
    };

    const [purchases, total] = await Promise.all([
      prisma.purchase.findMany({
        where,
        skip,
        take: limit,

        include: {
          supplier: true,

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

      prisma.purchase.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: purchases,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to fetch purchases:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch purchases",
      },
      {
        status: 500,
      }
    );
  }
}
export async function POST(req: Request) {

  try {

    const data = await req.json();


    const purchase = await prisma.$transaction(async (tx) => {


      // calculate total
      let totalAmount = 0;


      for (const item of data.items) {

        totalAmount += item.quantity * item.costPrice;

      }





      // create purchase

      const newPurchase = await tx.purchase.create({

        data: {

          supplierId: data.supplierId,

          totalAmount,

          items: {

            create: data.items.map((item: any) => ({

              productId: item.productId,

              quantity: item.quantity,

              costPrice: item.costPrice,

            }))

          }

        },

        include: {
          items: true
        }

      });







      // update inventory

      for (const item of data.items) {


        await tx.inventory.update({

          where: {
            productId: item.productId
          },


          data: {

            quantity: {
              increment: item.quantity
            }

          }

        });


      }





      return newPurchase;


    });




    return NextResponse.json(
      purchase,
      {
        status: 201
      }
    );



  } catch (error) {


    console.error(error);


    return NextResponse.json(

      {
        error: "Failed to create purchase",
        details: String(error)
      },

      {
        status: 500
      }

    );


  }

}
