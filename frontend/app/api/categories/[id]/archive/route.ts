import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("ARCHIVE CAREGORY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to archive Category" },
      { status: 500 }
    );
  }
}
