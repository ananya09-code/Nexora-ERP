


"use client";

import Link from "next/link";
import { useDashboard } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  FolderTree,
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { AddProductDialog } from "@/components/product-ui/add-produt";
import { AddSales } from "@/components/sales-ui/add-seles";
import AddCustomer from "@/components/customer-ui/add-Customer";
import { AddPurchase } from "@/components/purchases-ui/add-purchase";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-3" />
        <h3 className="text-lg font-semibold text-destructive">Failed to Load Live ERP Data</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Unable to connect to the database aggregation service. Please refresh or check connection.
        </p>
      </div>
    );
  }

  const { metrics, recentSales, lowStockItems, topCategories, recentPurchases } = data;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full space-y-8 pb-8">
      {/* Welcome & Action Banner */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-r from-blue-900/10 via-slate-900/5 to-transparent p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Operations Dashboard
            </h1>
            <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700 font-medium">
              Live Data
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Real-time executive snapshot of sales revenue, inventory health, and procurement orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <AddSales />
          <AddProductDialog />
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Revenue
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formatCurrency(metrics.totalRevenue)}
            </div>
            <p className="mt-1.5 flex items-center text-xs text-slate-500 gap-1.5">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <TrendingUp className="mr-0.5 h-3.5 w-3.5" />
                {metrics.totalSales} Sales
              </span>
              <span>• {metrics.totalProductsSold} items sold</span>
            </p>
          </CardContent>
        </Card>

        {/* Total Sales Orders */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Completed Orders
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {metrics.totalSales}
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Across <span className="font-semibold text-slate-700">{metrics.totalCustomers} registered customers</span>
            </p>
          </CardContent>
        </Card>

        {/* Inventory Stock & Valuation */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Inventory Value
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-200">
              <Boxes className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formatCurrency(metrics.inventoryValuation)}
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{metrics.totalStockUnits}</span> total units in stock
            </p>
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Stock Warnings
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>{metrics.lowStockCount + metrics.outOfStockCount}</span>
              {metrics.outOfStockCount > 0 && (
                <Badge variant="destructive" className="text-xs font-normal">
                  {metrics.outOfStockCount} out of stock
                </Badge>
              )}
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              <span className="font-semibold text-amber-600">{metrics.lowStockCount} items</span> below safety threshold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Operational Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Catalog Products</p>
            <p className="text-lg font-bold text-slate-900">{metrics.totalProducts} Active SKUs</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Customer Accounts</p>
            <p className="text-lg font-bold text-slate-900">{metrics.totalCustomers} Clients</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Suppliers</p>
            <p className="text-lg font-bold text-slate-900">{metrics.totalSuppliers} Vendors</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Procurement Spend</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(metrics.totalPurchaseSpend)}</p>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Recent Sales & Purchases (7 cols) */}
        <div className="space-y-8 lg:col-span-7">
          {/* Recent Sales Table */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Recent Sales Transactions
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Latest customer orders and revenue realization
                </CardDescription>
              </div>
              <Link href="/dashboard/sales">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                  View All Sales <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentSales.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400">
                  No sales recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-y bg-slate-50/75 text-xs text-slate-500 font-medium">
                      <tr>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentSales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {sale.customer ? `${sale.customer.firstName} ${sale.customer.lastName}` : "Walk-in Customer"}
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs">
                            {sale.items.length} {sale.items.length === 1 ? "item" : "items"}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {formatCurrency(sale.totalAmount)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                sale.status === "completed"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 text-xs"
                                  : "border-amber-200 bg-amber-50 text-amber-700 text-xs"
                              }
                            >
                              {sale.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right text-xs text-slate-400 whitespace-nowrap">
                            {formatDate(sale.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Procurement Orders */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Recent Restock Purchases
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Supplier deliveries syncing stock quantities
                </CardDescription>
              </div>
              <Link href="/dashboard/purchases">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                  View All Purchases <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentPurchases.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400">
                  No purchases recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-y bg-slate-50/75 text-xs text-slate-500 font-medium">
                      <tr>
                        <th className="py-3 px-4">Supplier</th>
                        <th className="py-3 px-4">Items Received</th>
                        <th className="py-3 px-4">Cost Total</th>
                        <th className="py-3 px-4 text-right">Received Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentPurchases.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {purchase.supplier?.name || "Direct Supplier"}
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs">
                            {purchase.items.reduce((sum, item) => sum + item.quantity, 0)} units ({purchase.items.length} SKUs)
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {formatCurrency(purchase.totalAmount)}
                          </td>
                          <td className="py-3 px-4 text-right text-xs text-slate-400 whitespace-nowrap">
                            {formatDate(purchase.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Low Stock Alerts & Category Distribution (5 cols) */}
        <div className="space-y-8 lg:col-span-5">
          {/* Urgent Low Stock Alerts */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Stock Alert Watchlist
                </CardTitle>
                <Link href="/dashboard/inventory">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                    Manage Stock
                  </Button>
                </Link>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Products nearing exhaustion requiring restock orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStockItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-emerald-600 font-medium">
                  ✓ All inventory items are within healthy stock thresholds.
                </div>
              ) : (
                lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-slate-900">{item.product.name}</p>
                      <p className="text-xs text-slate-500">
                        SKU: {item.product.sku} • {item.product.category?.name || "General"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={item.quantity === 0 ? "destructive" : "outline"}
                        className={
                          item.quantity === 0
                            ? "text-xs font-semibold"
                            : "border-amber-300 bg-amber-50 text-amber-800 text-xs font-semibold"
                        }
                      >
                        {item.quantity} {item.unit} left
                      </Badge>
                      <p className="text-[11px] text-slate-400 mt-0.5">Min: {item.minStock} {item.unit}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Product Category Breakdown */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <FolderTree className="h-4 w-4 text-blue-600" />
                  Category Breakdown
                </CardTitle>
                <Link href="/dashboard/products">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                    Products
                  </Button>
                </Link>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Distribution of active product catalog across categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCategories.map((cat) => {
                const count = cat._count.products;
                const percentage =
                  metrics.totalProducts > 0
                    ? Math.round((count / metrics.totalProducts) * 100)
                    : 0;

                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-500">
                        {count} SKUs ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Operational Shortcuts */}
          <Card className="border-slate-200/80 shadow-sm bg-gradient-to-br from-slate-900 to-slate-950 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Quick Operations
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Direct shortcuts to frequent business actions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2.5">
              <Link href="/dashboard/products" className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-200 hover:text-white"
                >
                  <Package className="mr-2 h-3.5 w-3.5 text-blue-400" />
                  Add Product
                </Button>
              </Link>

              <Link href="/dashboard/customers" className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-200 hover:text-white"
                >
                  <Users className="mr-2 h-3.5 w-3.5 text-indigo-400" />
                  New Customer
                </Button>
              </Link>

              <Link href="/dashboard/purchases" className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-200 hover:text-white"
                >
                  <ShoppingBag className="mr-2 h-3.5 w-3.5 text-emerald-400" />
                  Restock Order
                </Button>
              </Link>

              <Link href="/dashboard/Suppliers" className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-200 hover:text-white"
                >
                  <Truck className="mr-2 h-3.5 w-3.5 text-amber-400" />
                  Add Supplier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8 pb-8">
      <div className="h-28 w-full rounded-2xl bg-slate-100 animate-pulse" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <div className="h-80 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
        </div>
        <div className="space-y-8 lg:col-span-5">
          <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-56 rounded-xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}