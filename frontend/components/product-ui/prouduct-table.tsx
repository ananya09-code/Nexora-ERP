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
import { Package, PackageOpen } from "lucide-react";
import { FilterCard } from "@/components/app-filter";
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { AppPagination } from "@/components/app-Pagination";

const formatCurrency = (val: number | null | undefined) => {
  if (val === null || val === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export function ProductTable({ data, isLoading, error }: any) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
        <div className="p-4 space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center text-sm text-destructive">
        Failed to load products. Please check connection and try again.
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
            <TableHead className="font-semibold text-slate-700">Barcode</TableHead>
            <TableHead className="font-semibold text-slate-700">Category</TableHead>
            <TableHead className="font-semibold text-slate-700">Cost Price</TableHead>
            <TableHead className="font-semibold text-slate-700">Selling Price</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                <PackageOpen className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No products found matching the criteria.
              </TableCell>
            </TableRow>
          ) : (
            data.map((product: any) => (
              <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900 flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold block leading-snug">{product.name}</span>
                    {product.description && (
                      <span className="text-xs text-slate-400 line-clamp-1">{product.description}</span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-mono text-xs text-slate-600">
                  {product.sku}
                </TableCell>

                <TableCell className="text-xs text-slate-500">
                  {product.barcode || "-"}
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="border-blue-200 bg-blue-50/50 text-blue-700 text-xs font-normal">
                    {product.category?.name || "Uncategorized"}
                  </Badge>
                </TableCell>

                <TableCell className="text-slate-600 text-sm">
                  {formatCurrency(product.costPrice)}
                </TableCell>

                <TableCell className="font-semibold text-slate-900 text-sm">
                  {formatCurrency(product.price)}
                </TableCell>

                <TableCell className="text-right">
                  <AppAction settype="product" data={product} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={5} className="text-xs font-medium text-slate-500">
              Showing Products On Page
            </TableCell>
            <TableCell colSpan={2} className="text-right text-xs font-bold text-slate-900">
              {data.length} Products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function ProductUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const { data: products, isPending, error } = useProducts({ ...filterValues, page, limit });

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="products" onApply={setFilterValues} />
      <ProductTable data={products?.data ?? []} isLoading={isPending} error={error} />
      {products?.meta && (
        <AppPagination setLimit={setlimit} meta={products.meta} selectedPage={setPage} />
      )}
    </div>
  );
}
 
