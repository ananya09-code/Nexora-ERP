"use client";

import { AppAction } from "../app-Action";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePurchases } from "@/hooks/use-purchase";
import { ShoppingBag, Truck } from "lucide-react";
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

export function PurchaseTable({ isLoading, error, purchases }: any) {
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
        Failed to load purchase history. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Supplier</TableHead>
            <TableHead className="font-semibold text-slate-700">Items Received</TableHead>
            <TableHead className="font-semibold text-slate-700">Order Date</TableHead>
            <TableHead className="font-semibold text-slate-700">Total Spend</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!purchases || purchases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                <ShoppingBag className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No purchase orders recorded yet.
              </TableCell>
            </TableRow>
          ) : (
            purchases.map((purchase: any) => (
              <TableRow key={purchase.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-semibold text-slate-900 flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span>{purchase.supplier?.name || "Direct Supplier"}</span>
                </TableCell>

                <TableCell className="text-slate-600 text-sm">
                  {purchase.items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0} units ({purchase.items?.length || 0} SKUs)
                </TableCell>

                <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                  {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className="font-bold text-slate-900 text-sm">
                  {formatCurrency(purchase.totalAmount)}
                </TableCell>

                <TableCell className="text-right">
                  <AppAction settype="purchase" data={purchase} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={3} className="text-xs font-medium text-slate-500">
              Total Recorded Purchases
            </TableCell>
            <TableCell colSpan={2} className="text-right text-xs font-bold text-slate-900">
              {purchases?.length ?? 0} Orders
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function PurchaseUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: purchases, isLoading, error } = usePurchases({ ...filterValues, page, limit });

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="purchases" onApply={setFilterValues} />
      <PurchaseTable
        isLoading={isLoading}
        error={error}
        purchases={purchases?.data ?? []}
      />
      {purchases?.meta && (
        <AppPagination
          setLimit={setLimit}
          meta={purchases.meta}
          selectedPage={setPage}
        />
      )}
    </div>
  );
}


