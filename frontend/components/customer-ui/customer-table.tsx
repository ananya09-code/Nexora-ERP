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
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AppAction } from "../app-Action";
import { useCustomers } from "@/hooks/use-customer";
import { Users, UserX, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { FilterCard } from "@/components/app-filter";
import { AppPagination } from "@/components/app-Pagination";

export function CustomerTable({ isLoading, error, customers }: any) {
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
        Failed to load customer directory. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Customer</TableHead>
            <TableHead className="font-semibold text-slate-700">Email</TableHead>
            <TableHead className="font-semibold text-slate-700">Phone</TableHead>
            <TableHead className="font-semibold text-slate-700">Address</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                <UserX className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No customers found matching your search.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer: any) => {
              const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase() || "CU";

              return (
                <TableRow key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-semibold text-slate-900 flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 border border-blue-200">
                      <AvatarFallback className="bg-blue-50 text-blue-700 text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{customer.firstName} {customer.lastName}</span>
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm">
                    {customer.email ? (
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {customer.email}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">No email</span>
                    )}
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm">
                    {customer.phone ? (
                      <span className="flex items-center gap-1.5 font-mono text-xs">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {customer.phone}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">No phone</span>
                    )}
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm max-w-xs truncate">
                    {customer.address || <span className="text-slate-400 italic">No address on file</span>}
                  </TableCell>

                  <TableCell className="text-right">
                    <AppAction data={customer} settype="customer" />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={4} className="text-xs font-medium text-slate-500">
              Total Customer Profiles
            </TableCell>
            <TableCell className="text-right text-xs font-bold text-slate-900">
              {customers.length} Clients
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function CustomerUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const { data: customers, isLoading, error } = useCustomers({ ...filterValues, page, limit });

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="customers" onApply={setFilterValues} />
      <CustomerTable customers={customers?.data ?? []} isLoading={isLoading} error={error} />
      {customers?.meta && (
        <AppPagination setLimit={setlimit} meta={customers.meta} selectedPage={setPage} />
      )}
    </div>
  );
}

