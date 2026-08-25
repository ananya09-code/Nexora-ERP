import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const supplier = await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return Response.json(supplier);
  } catch (error) {
    console.error("ARCHIVE SUPPLIER ERROR:", error);

    return Response.json(
      { error: "Failed to archive supplier" },
      { status: 500 }
    );
  }
}

