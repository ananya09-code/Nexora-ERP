import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      salesCount,
      revenueAgg,
      itemsSoldAgg,
      customersCount,
      suppliersCount,
      productsCount,
      purchasesCount,
      purchasesSpendAgg,
      lowStockCount,
      outOfStockCount,
      allInventory,
      recentSales,
      lowStockItems,
      topCategories,
      recentPurchases,
    ] = await Promise.all([
      // Sales KPIs
      prisma.sale.count(),
      prisma.sale.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.saleItem.aggregate({
        _sum: { quantity: true },
      }),

      // Entities
      prisma.customer.count({ where: { isActive: true } }),
      prisma.supplier.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true } }),

      // Procurement
      prisma.purchase.count(),
      prisma.purchase.aggregate({
        _sum: { totalAmount: true },
      }),

      // Stock health counts
      prisma.inventory.count({
        where: {
          quantity: {
            gt: 0,
            lte: 10,
          },
        },
      }),
      prisma.inventory.count({
        where: {
          quantity: {
            lte: 0,
          },
        },
      }),

      // Inventory valuation dataset
      prisma.inventory.findMany({
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
              costPrice: true,
            },
          },
        },
      }),

      // Recent 5 sales with customer and line items
      prisma.sale.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      }),

      // Low stock urgent alerts
      prisma.inventory.findMany({
        where: {
          quantity: { lte: 10 },
        },
        take: 6,
        orderBy: { quantity: "asc" },
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      }),

      // Top categories with product counts
      prisma.category.findMany({
        take: 6,
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: {
          products: {
            _count: "desc",
          },
        },
      }),

      // Recent 5 purchases
      prisma.purchase.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          supplier: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
    ]);

    // Calculate total inventory valuation based on unit cost price (fallback to price)
    const inventoryValuation = allInventory.reduce((acc, item) => {
      const unitValue = item.product.costPrice ?? item.product.price ?? 0;
      return acc + item.quantity * unitValue;
    }, 0);

    const totalStockUnits = allInventory.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return NextResponse.json({
      metrics: {
        totalRevenue: revenueAgg._sum.totalAmount ?? 0,
        totalSales: salesCount,
        totalProductsSold: itemsSoldAgg._sum.quantity ?? 0,
        totalCustomers: customersCount,
        totalSuppliers: suppliersCount,
        totalProducts: productsCount,
        totalPurchases: purchasesCount,
        totalPurchaseSpend: purchasesSpendAgg._sum.totalAmount ?? 0,
        lowStockCount,
        outOfStockCount,
        totalStockUnits,
        inventoryValuation,
      },
      recentSales,
      lowStockItems,
      topCategories,
      recentPurchases,
    });
  } catch (error) {
    console.error("Dashboard summary API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard summary", details: String(error) },
      { status: 500 }
    );
  }
}
