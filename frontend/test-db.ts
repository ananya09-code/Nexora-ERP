import { prisma } from "./lib/prisma";

async function main() {
  const start1 = performance.now();

  await prisma.$queryRaw`SELECT 1`;

  const end1 = performance.now();

  const start2 = performance.now();

  await prisma.$queryRaw`SELECT 1`;

  const end2 = performance.now();

  console.log(`First query:  ${(end1 - start1).toFixed(2)} ms`);
  console.log(`Second query: ${(end2 - start2).toFixed(2)} ms`);

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
