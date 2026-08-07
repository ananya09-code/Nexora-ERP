"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { useSummary } from "@/hooks/use-summary";
export function SalesSummaryCards() {
  const { data: summary = [],
    isPending, error
  } = useSummary()
  if (isPending) {
    return <h1>loading......</h1>
  }
  if (error) {
    return <h1>failed to get summary</h1>
  }
  console.log(summary)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {/* Total Sales */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Sales
          </CardTitle>

          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {summary.totalSales}
          </div>

          <p className="text-xs text-muted-foreground">
            Total completed sales
          </p>
        </CardContent>
      </Card>


      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>

          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {summary.totalRevenue}
          </div>

          <p className="text-xs text-muted-foreground">
            Total revenue generated
          </p>
        </CardContent>
      </Card>


      {/* Products Sold */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Products Sold
          </CardTitle>

          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {summary.totalProductsSold}
          </div>

          <p className="text-xs text-muted-foreground">
            Total units sold
          </p>
        </CardContent>
      </Card>


      {/* Customers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Customers
          </CardTitle>

          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {summary.totalCustomers}
          </div>

          <p className="text-xs text-muted-foreground">
            Customers who made purchases
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
