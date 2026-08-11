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


import { useCustomers } from "@/hooks/use-customer";
export function CustomerTable({ isLoading, error, customers }: any) {
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products.</p>;
  }
  console.log(customers)
  return (
    <Table>
      <TableCaption>Customer List</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer: any) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.firstName}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Customers</TableCell>
          <TableCell>{customers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
import { useState } from "react";
import { FilterCard } from "@/components/app-filter"
export function CustomerUi() {
  const [filterValues, setFilterValues] = useState({});
  const {
    data: customers = [],
    isLoading,
    error,
  } = useCustomers(filterValues)

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="customers" onApply={setFilterValues} />
      <CustomerTable customers={customers} isLoading={isLoading} error={error} />
    </div>
  )

}
