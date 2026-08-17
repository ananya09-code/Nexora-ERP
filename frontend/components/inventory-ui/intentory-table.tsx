"use client";

import { AdjustInventory } from "@/components/inventory-ui/edit-inventory";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    return <div>Loading inventory...</div>;
  }

  if (error) {
    return <div>Failed to load inventory.</div>;
  }
  return (
    <Table>
      <TableCaption>Inventory List</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {inventorydata.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.product.name}</TableCell>

            <TableCell>{item.product.sku}</TableCell>

            <TableCell>{item.product.category.name}</TableCell>

            <TableCell>{item.quantity}</TableCell>

            <TableCell>{item.unit}</TableCell>

            <TableCell>
              {item.quantity === 0
                ? "Out of Stock"
                : item.quantity <= item.minStock
                  ? "Low Stock"
                  : "Good"}
            </TableCell>

            <TableCell>
              <AdjustInventory inventory={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            Total Inventory Items
          </TableCell>

          <TableCell>{inventorydata.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
//inventory card
import { useSummaryInventory } from "@/hooks/use-inventory";
export function InventoryCard() {
  const { data: summary = [], isPending } = useSummaryInventory();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Total Products
        </p>

        <p className="text-2xl font-bold">
          {isPending ? "..." : summary.totalProducts}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Low Stock
        </p>

        <p className="text-2xl font-bold">
          {isPending ? "..." : summary.lowStock}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Out Of Stock
        </p>

        <p className="text-2xl font-bold">
          {isPending ? "..." : summary.outOfStock}
        </p>
      </div>

    </div>
  );

}
import { AppPagination } from "../app-Pagination";
import { useState } from "react";
import { FilterCard } from "../app-filter";
import { useInventory } from "@/hooks/use-inventory";
export function InventoryUi() {
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState({})
  const limit = 10
  const { data: inventoryResponse = [], isLoading, error } = useInventory({ ...filterValues, page, limit });
  const inventorydata = inventoryResponse?.data ?? [];
  const meta = inventoryResponse?.meta;
  return (
    <div className="p-6 space-y-6">
      <InventoryCard />
      <FilterCard pagetype="inventory" onApply={setFilterValues} />
      <InventoryTable inventorydata={inventorydata} isLoading={isLoading} error={error} />
      <AppPagination selectedpage={setPage} meta={inventorydata.length} />
    </div>
  )
}
