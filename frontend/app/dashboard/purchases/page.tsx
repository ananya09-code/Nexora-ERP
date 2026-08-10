import { AddPurchase } from "@/components/purchases-ui/add-purchase"
import { PurchaseTable } from "@/components/purchases-ui/PurchaseTable"
import { FilterCard } from "@/components/app-filter"
export default function purchasePage() {
  return (
    <div className="w-full space-y-6">

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Purchase Catalog
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your products, inventory, and pricing.
          </p>

        </div>
        <AddPurchase />
      </div>
      <FilterCard pagetype="purchases" />
      <PurchaseTable />
    </div>

  )
}
