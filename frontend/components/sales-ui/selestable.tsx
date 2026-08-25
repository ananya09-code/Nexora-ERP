"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSales } from "@/hooks/use-sales";
import { AppAction } from "../app-Action";
import { TrendingUp, ShoppingCart, Calendar } from "lucide-react";
import { FilterCard } from "@/components/app-filter";
import { useState } from "react";
import { AppPagination } from "../app-Pagination";

const formatCurrency = (val: number | null | undefined) => {
  if (val === null || val === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export function SalesTable({ isLoading, error, sales }: any) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white shadow-xs overflow-hidden p-4 space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center text-sm text-destructive">
        Failed to load sales catalog. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Sale ID</TableHead>
            <TableHead className="font-semibold text-slate-700">Customer</TableHead>
            <TableHead className="font-semibold text-slate-700">Line Items</TableHead>
            <TableHead className="font-semibold text-slate-700">Total Amount</TableHead>
            <TableHead className="font-semibold text-slate-700">Fulfillment Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Date</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!sales || sales.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                <ShoppingCart className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No sales records found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale: any) => (
              <TableRow key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  #{sale.id.slice(-6).toUpperCase()}
                </TableCell>

                <TableCell className="font-medium text-slate-900">
                  {sale.customer ? `${sale.customer.firstName} ${sale.customer.lastName}` : "Direct Customer"}
                </TableCell>

                <TableCell className="text-slate-600 text-sm">
                  {sale.items?.length || 0} {sale.items?.length === 1 ? "item" : "items"}
                </TableCell>

                <TableCell className="font-bold text-slate-900 text-sm">
                  {formatCurrency(sale.totalAmount)}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      sale.status === "completed"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium"
                        : sale.status === "pending"
                        ? "border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium"
                        : "border-slate-200 bg-slate-100 text-slate-600 text-xs font-medium"
                    }
                  >
                    {sale.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                  {new Date(sale.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className="text-right">
                  <AppAction settype="sale" data={sale} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={5} className="text-xs font-medium text-slate-500">
              Showing Transactions On Page
            </TableCell>
            <TableCell colSpan={2} className="text-right text-xs font-bold text-slate-900">
              {sales?.length ?? 0} Orders
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function SalesUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const { data: sales, isLoading, error } = useSales({ ...filterValues, page, limit });

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="sales" onApply={setFilterValues} />
      <SalesTable isLoading={isLoading} error={error} sales={sales?.data ?? []} />
      {sales?.meta && (
        <AppPagination setLimit={setlimit} meta={sales.meta} selectedPage={setPage} />
      )}
    </div>
  );
}

