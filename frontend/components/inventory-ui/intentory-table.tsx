"use client";
import { AdjustInventory } from "@/components/inventory-ui/edit-inventory"
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

export function InventoryTable({
  inventorydata,
}: {
  inventorydata: any[];
}) {
  return (
    <Table>
      <TableCaption>
        Inventory List
      </TableCaption>

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
        {inventorydata.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.product.name}
            </TableCell>

            <TableCell>
              {item.product.sku}
            </TableCell>

            <TableCell>
              {item.product.category.name}
            </TableCell>

            <TableCell>
              {item.quantity}
            </TableCell>

            <TableCell>
              {item.unit}
            </TableCell>

            <TableCell>
              {item.quantity === 0
                ? "Out of Stock"
                : item.quantity <= item.minStock
                  ? "Low Stock"
                  : "Good"}
            </TableCell>
            <TableCell><AdjustInventory inventory={item} /></TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            Total Inventory Items
          </TableCell>

          <TableCell>
            {inventorydata.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export function InventoryCard({ inventorydata }: { inventorydata: any[] }) {
  const lowStock = inventorydata.filter(
    (item) => item.quantity > 0 && item.quantity <= 10
  ).length;

  const outOfStock = inventorydata.filter(
    (item) => item.quantity === 0
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Total Products
        </p>

        <p className="text-2xl font-bold">
          {inventorydata.length}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Low Stock
        </p>

        <p className="text-2xl font-bold">
          {lowStock}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Out Of Stock
        </p>

        <p className="text-2xl font-bold">
          {outOfStock}
        </p>
      </div>

    </div>
  );
}


import { useInventory } from "@/hooks/use-inventory";
export function InventoryUi() {
  const { data: inventory = [] } = useInventory();
  console.log(inventory)
  return (
    <div className="p-6 space-y-6">
      <InventoryCard inventorydata={inventory} />
      <InventoryTable inventorydata={inventory} />
    </div>
  )
}
