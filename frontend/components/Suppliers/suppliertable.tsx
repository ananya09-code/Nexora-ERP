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
import { AppAction } from "../app-Action";
import { useSuppliers } from "@/hooks/use-supplier";
import { Truck, Mail, Phone, Building } from "lucide-react";
import { FilterCard } from "../app-filter";
import { useState } from "react";
import { AppPagination } from "../app-Pagination";

export function SupplierTable({ isLoading, error, suppliers }: any) {
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
        Failed to load supplier directory. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Supplier Name</TableHead>
            <TableHead className="font-semibold text-slate-700">Contact Person</TableHead>
            <TableHead className="font-semibold text-slate-700">Email</TableHead>
            <TableHead className="font-semibold text-slate-700">Phone</TableHead>
            <TableHead className="font-semibold text-slate-700">Address</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {suppliers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-slate-400">
                <Truck className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No suppliers found matching your search.
              </TableCell>
            </TableRow>
          ) : (
            suppliers.map((supplier: any) => (
              <TableRow key={supplier.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-semibold text-slate-900 flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span>{supplier.name}</span>
                </TableCell>

                <TableCell className="text-slate-700 text-sm">
                  {supplier.contactPerson || <span className="text-slate-400 italic">General Contact</span>}
                </TableCell>

                <TableCell className="text-slate-600 text-sm">
                  {supplier.email ? (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {supplier.email}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">No email</span>
                  )}
                </TableCell>

                <TableCell className="text-slate-600 text-sm">
                  {supplier.phone ? (
                    <span className="flex items-center gap-1.5 font-mono text-xs">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {supplier.phone}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">No phone</span>
                  )}
                </TableCell>

                <TableCell className="text-slate-600 text-sm max-w-xs truncate">
                  {supplier.address || <span className="text-slate-400 italic">No address on file</span>}
                </TableCell>

                <TableCell className="text-right">
                  <AppAction settype="supplier" data={supplier} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={4} className="text-xs font-medium text-slate-500">
              Total Verified Suppliers
            </TableCell>
            <TableCell colSpan={2} className="text-right text-xs font-bold text-slate-900">
              {suppliers.length} Vendors
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function SupplierUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: suppliers, isLoading, error } = useSuppliers({ ...filterValues, page, limit });

  return (
    <div className="w-full space-y-6">
      <FilterCard pagetype="suppliers" onApply={setFilterValues} />
      <SupplierTable suppliers={suppliers?.data ?? []} isLoading={isLoading} error={error} />
      {suppliers?.meta && (
        <AppPagination setLimit={setLimit} meta={suppliers.meta} selectedPage={setPage} />
      )}
    </div>
  );
}

