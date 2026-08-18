"use client";

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


import { useSuppliers } from "@/hooks/use-supplier";
export function SupplierTable({ isLoading, error, suppliers }: any) {
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products.</p>;
  }



  return (
    <Table>
      <TableCaption>Supplier List</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Supplier Name</TableHead>
          <TableHead>Contact Person</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {suppliers.map((supplier: any) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">
              {supplier.name}
            </TableCell>

            <TableCell>
              {supplier.contactPerson || "-"}
            </TableCell>

            <TableCell>
              {supplier.email || "-"}
            </TableCell>

            <TableCell>
              {supplier.phone || "-"}
            </TableCell>

            <TableCell>
              {supplier.address || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Suppliers</TableCell>
          <TableCell>{suppliers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
import { FilterCard } from "../app-filter";
import { useState } from "react";
import { AppPagination } from "../app-Pagination";
export function SupplierUi() {

  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    data: suppliers,
    isLoading,
    error,
  } = useSuppliers({ ...filterValues, page, limit })
  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="suppliers" onApply={setFilterValues} />
      <SupplierTable suppliers={suppliers?.data ?? []} isLoading={isLoading} error={error} />
      {(suppliers?.meta && (<AppPagination meta={suppliers.meta} selectedPage={setPage} />))}
    </div>
  )
}
