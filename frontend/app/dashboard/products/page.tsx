"use client";
import { AddProductDialog } from "@/components/product-ui/add-produt"
import { ProductTable } from "@/components/product-ui/prouduct-table"
import { FilterCard } from "@/components/app-filter"
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
export default function ProductPage() {
  const [filterValues, setFilterValues] = useState({});

  const { data: products = [], isPending, error } =
    useProducts(filterValues);
  return (
    <div className="w-full space-y-6">

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Product Catalog
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your products, inventory, and pricing.
          </p>
        </div>

        <AddProductDialog />

      </div>
      <FilterCard pagetype="products" onApply={setFilterValues} />
      <ProductTable data={products} isLoading={isPending} error={error} />
    </div>
  )
}
