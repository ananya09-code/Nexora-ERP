import { prisma } from "@/lib/prisma";

async function main() {

  const products = await prisma.product.findMany();


  for (const product of products) {

    const exists = await prisma.inventory.findUnique({
      where: {
        productId: product.id,
      },
    });


    if (!exists) {

      await prisma.inventory.create({
        data: {
          productId: product.id,
          quantity: 0,
          minStock: 5,
          unit: "pcs",
        },
      });

    }

  }


  console.log("Inventory created for old products");

}


main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
