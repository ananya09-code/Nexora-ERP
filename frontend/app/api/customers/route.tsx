import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const customerId = searchParams.get("customerId");
    const email = searchParams.get("email");
    const createdAt = searchParams.get("createdAt");

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const where = {
      ...(customerId && {
        id: customerId,
      }),

      ...(email && {
        email: email,
      }),

      ...(search && {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            lastName: {
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

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.customer.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: customers,
      meta: {
        page,
        limit,
        totalPages,
        total,
      },
    });
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch customers",
        error: String(error),
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

    const findUser = await prisma.customer.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      return NextResponse.json(
        { message: "Customer is already added!" },
        { status: 409 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
      },
    });

    return NextResponse.json(customer, {
      status: 201,
    });

  } catch (error) {
    console.error("CREATE CUSTOMER ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to add the customer",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
