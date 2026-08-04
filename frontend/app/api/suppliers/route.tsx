import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const suppliers = await prisma.supplier.findMany();

  return NextResponse.json(suppliers);
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
