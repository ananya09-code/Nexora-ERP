import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
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

    return Response.json(sales);
  } catch (error) {
    return Response.json(
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







