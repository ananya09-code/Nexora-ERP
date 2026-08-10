import { AddSales } from "@/components/sales-ui/add-seles"
import { SalesSummaryCards } from "@/components/sales-ui/sales-card"
import { SalesTable } from "@/components/sales-ui/selestable"
import { FilterCard } from "@/components/app-filter"
export default function SalesPage() {
  return (

    <div className="w-full space-y-6">

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sales Catalog
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your Sales, Order, and Profit.
          </p>
        </div>
        <AddSales />
      </div>


      <SalesSummaryCards />

      <FilterCard pagetype="sales" />
      <SalesTable />
    </div>

  )
}


