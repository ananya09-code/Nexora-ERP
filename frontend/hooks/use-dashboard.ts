"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  metrics: {
    totalRevenue: number;
    totalSales: number;
    totalProductsSold: number;
    totalCustomers: number;
    totalSuppliers: number;
    totalProducts: number;
    totalPurchases: number;
    totalPurchaseSpend: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalStockUnits: number;
    inventoryValuation: number;
  };
  recentSales: Array<{
    id: string;
    customerId: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string | null;
    };
    items: Array<{
      id: string;
      quantity: number;
      price: number;
      product: {
        name: string;
        sku: string;
      };
    }>;
  }>;
  lowStockItems: Array<{
    id: string;
    productId: string;
    quantity: number;
    minStock: number;
    unit: string;
    product: {
      id: string;
      name: string;
      sku: string;
      price: number;
      category: {
        name: string;
      };
    };
  }>;
  topCategories: Array<{
    id: string;
    name: string;
    description: string | null;
    _count: {
      products: number;
    };
  }>;
  recentPurchases: Array<{
    id: string;
    supplierId: string;
    totalAmount: number;
    createdAt: string;
    supplier: {
      name: string;
      contactPerson: string | null;
    };
    items: Array<{
      quantity: number;
      costPrice: number;
      product: {
        name: string;
      };
    }>;
  }>;
}

async function getDashboardSummary(): Promise<DashboardData> {
  const res = await fetch("/api/dashboard/summary");
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }
  return res.json();
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    refetchInterval: 30000,
  });
}
