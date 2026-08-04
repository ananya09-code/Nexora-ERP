import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const Customer = await prisma.customer.findMany()
  return NextResponse.json(Customer)
}
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const finduser = await prisma.customer.findUnique({
      where: {
        email: data.email
      }
    })

    if (finduser) {
      return NextResponse.json(
        { message: "Customer is already added!" },
        { status: 409 }
      )
    }
    const customer = await prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        address: data.Adreess,
      }
    })
    return NextResponse.json(
      customer, {
      status: 200
    }
    )

  }
  catch (error) {
    return NextResponse.json(
      {
        error: "Failed to add the customer",
        details: String(error)
      },
      {
        status: 500,
      }
    );

  }

}


