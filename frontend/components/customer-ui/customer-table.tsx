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

import { useEffect, useState } from "react";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
};

export function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customers");

        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data: Customer[] = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCustomers(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loadingCustomers) {
    return <p>Loading customers...</p>;
  }

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
        {customers.map((customer) => (
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
