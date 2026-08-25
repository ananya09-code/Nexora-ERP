import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const supplierId = searchParams.get("supplierId");
  const email = searchParams.get("email");
  const createdAt = searchParams.get("createdAt");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  const where = {
    isActive: true,
    ...(supplierId && {
      id: supplierId,
    }),

    ...(email && {
      email: {
        contains: email,
        mode: "insensitive" as const,
      },
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
          email: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(createdAt && {
      createdAt: {
        gte: new Date(createdAt),
      },
    }),
  };

  const [suppliers, total] = await Promise.all([
    prisma.supplier.findMany({
      where,

      skip,
      take: limit,

    }),

    prisma.supplier.count({
      where,
    }),
  ]);

  return NextResponse.json({
    data: suppliers,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}




export async function POST(req: Request) {

  try {

    const data = await req.json();


    const findSupplier = await prisma.supplier.findUnique({
      where: {
        email: data.email,
      },
    });


    if (findSupplier) {

      return NextResponse.json(
        { message: "Supplier is already added!" },
        { status: 409 }
      );

    }



    const supplier = await prisma.supplier.create({

      data: {

        name: data.name,

        contactPerson: data.contactPerson,

        email: data.email,

        phone: data.phone,

        address: data.address,

      },

    });



    return NextResponse.json(
      supplier,
      {
        status: 200,
      }
    );



  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to add the supplier",
        details: String(error),
      },
      {
        status: 500,
      }
    );

  }

}
