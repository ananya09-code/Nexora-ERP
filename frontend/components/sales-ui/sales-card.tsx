"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  TrendingUp,
} from "lucide-react";
import { useSummary } from "@/hooks/use-summary";

const formatCurrency = (val: number | null | undefined) => {
  if (val === null || val === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export function SalesSummaryCards() {
  const { data: summary, isPending, error } = useSummary();

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || !summary) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Sales */}
      <Card className="border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Sales
          </CardTitle>
          <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <ShoppingCart className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.totalSales ?? 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">Total completed transactions</p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Total Revenue
          </CardTitle>
          <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {formatCurrency(summary.totalRevenue)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Cumulative sales income</p>
        </CardContent>
      </Card>

      {/* Products Sold */}
      <Card className="border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Units Sold
          </CardTitle>
          <div className="h-9 w-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
            <Package className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.totalProductsSold ?? 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">Total inventory volume fulfilled</p>
        </CardContent>
      </Card>

      {/* Customers */}
      <Card className="border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Unique Buyers
          </CardTitle>
          <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.totalCustomers ?? 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">Active transacting clients</p>
        </CardContent>
      </Card>
    </div>
  );
}

