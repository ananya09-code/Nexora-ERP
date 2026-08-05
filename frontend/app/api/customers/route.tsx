import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);

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
