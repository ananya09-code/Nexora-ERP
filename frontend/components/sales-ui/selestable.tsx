"use client";
import { SaleDetailsDialog } from "./detail-sales";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSales } from "@/hooks/use-sales";

export function SalesTable({ isLoading, error, sales }: any) {
  if (isLoading) {
    return <p>Loading sales...</p>;
  }

  if (error) {
    return <p>Failed to load sales.</p>;
  }

  return (
    <Table>
      <TableCaption>Recent Sales</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Sale ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sales.map((sale: any) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">
              {sale.id.slice(0, 8)}...
            </TableCell>

            <TableCell>
              {sale.customer.firstName} {sale.customer.lastName}
            </TableCell>

            <TableCell>{sale.items.length}</TableCell>

            <TableCell className="capitalize">
              {sale.status}
            </TableCell>

            <TableCell>
              ETB {sale.totalAmount.toLocaleString()}
            </TableCell>

            <TableCell className="">
              <SaleDetailsDialog sale={sale} />
            </TableCell>

            <TableCell>
              {new Date(sale.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
import { FilterCard } from "@/components/app-filter";
import { useState } from "react";
import { AppPagination } from "../app-Pagination";
export function SalesUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const {
    data: sales,
    isLoading,
    error,
  } = useSales({ ...filterValues, page, limit });


  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="sales" onApply={setFilterValues} />
      <SalesTable isLoading={isLoading} error={error} sales={sales?.data} />
      {sales?.meta && (
        <AppPagination setLimit={setlimit} t meta={sales.meta} selectedPage={setPage} />
      )}
    </div>
  )
}
