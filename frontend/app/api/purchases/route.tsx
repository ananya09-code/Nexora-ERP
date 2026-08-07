import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET ALL PURCHASES
export async function GET() {

  try {

    const purchases = await prisma.purchase.findMany({

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
