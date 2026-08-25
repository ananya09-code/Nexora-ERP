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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Boxes, AlertTriangle, XCircle, CheckCircle2, Package } from "lucide-react";
import { useSummaryInventory } from "@/hooks/use-inventory";
import { AppPagination } from "../app-Pagination";
import { useState } from "react";
import { FilterCard } from "../app-filter";
import { useInventory } from "@/hooks/use-inventory";

type InventoryTableProps = {
  isLoading: boolean;
  error: unknown;
  inventorydata: any[];
};

export function InventoryTable({
  isLoading,
  error,
  inventorydata,
}: InventoryTableProps) {
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
        Failed to load inventory. Please check connection and try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Product Name</TableHead>
            <TableHead className="font-semibold text-slate-700">SKU</TableHead>
            <TableHead className="font-semibold text-slate-700">Category</TableHead>
            <TableHead className="font-semibold text-slate-700">Current Stock</TableHead>
            <TableHead className="font-semibold text-slate-700">Stock Status</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {inventorydata.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-slate-400">
                <Boxes className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No inventory records found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            inventorydata.map((item) => {
              const isOutOfStock = item.quantity <= 0;
              const isLowStock = !isOutOfStock && item.quantity <= item.minStock;

              return (
                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-semibold text-slate-900 flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Package className="h-4 w-4" />
                    </div>
                    <span>{item.product.name}</span>
                  </TableCell>

                  <TableCell className="font-mono text-xs text-slate-600">
                    {item.product.sku}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 text-xs">
                      {item.product.category?.name || "General"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="font-bold text-slate-900 text-sm">
                      {item.quantity}
                    </span>{" "}
                    <span className="text-xs text-slate-500">{item.unit}</span>
                  </TableCell>

                  <TableCell>
                    {isOutOfStock ? (
                      <Badge variant="destructive" className="text-xs font-medium gap-1">
                        <XCircle className="h-3 w-3" />
                        Out of Stock
                      </Badge>
                    ) : isLowStock ? (
                      <Badge
                        variant="outline"
                        className="border-amber-300 bg-amber-50 text-amber-800 text-xs font-medium gap-1"
                      >
                        <AlertTriangle className="h-3 w-3 text-amber-600" />
                        Low Stock ({item.quantity} left)
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        In Stock
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <AppAction data={item} settype="inventory" />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={4} className="text-xs font-medium text-slate-500">
              Total Tracked Inventory Records
            </TableCell>
            <TableCell colSpan={2} className="text-right text-xs font-bold text-slate-900">
              {inventorydata.length} Items Listed
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function InventoryCard() {
  const { data: summary, isPending } = useSummaryInventory();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-slate-200/80 shadow-xs">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Tracked SKUs
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {isPending ? "..." : summary?.totalProducts ?? 0}
            </p>
            <p className="text-xs text-slate-400 mt-1">Active inventory lines</p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Boxes className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-xs">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Low Stock Warnings
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
              {isPending ? "..." : summary?.lowStock ?? 0}
            </p>
            <p className="text-xs text-slate-400 mt-1">Below safety thresholds</p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-xs">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
              Out of Stock
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-destructive mt-1">
              {isPending ? "..." : summary?.outOfStock ?? 0}
            </p>
            <p className="text-xs text-slate-400 mt-1">Requiring replenishment</p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
            <XCircle className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function InventoryUi() {
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState({});
  const [limit, setLimit] = useState(10);
  const { data: inventory, isLoading, error } = useInventory({ ...filterValues, page, limit });

  return (
    <div className="space-y-6">
      <InventoryCard />
      <FilterCard pagetype="inventory" onApply={setFilterValues} />
      <InventoryTable inventorydata={inventory?.data ?? []} isLoading={isLoading} error={error} />
      {inventory?.meta && (
        <AppPagination setLimit={setLimit} meta={inventory.meta} selectedPage={setPage} />
      )}
    </div>
  );
}

