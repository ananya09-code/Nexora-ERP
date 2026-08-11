import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


// GET ALL PURCHASES
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const supplierId = searchParams.get("supplierId");
  const productId = searchParams.get("productId");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");


  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        ...(productId && {
          items: {
            some: {
              productId,
            },
          },
        }),

        ...(supplierId && {
          supplierId,
        }),

        ...(search && {
          OR: [
            {
              supplier: {
                name: {
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
      },

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
    });

    return NextResponse.json(purchases);


  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch purchases",
        details: String(error),
      },
      {
        status: 500,
      }
    );

  }

}



// CREATE PURCHASE
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
