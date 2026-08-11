import AddSupplier from "@/components/Suppliers/add-Suppliers"
import { SupplierUi } from "@/components/Suppliers/suppliertable"
export default function SupplierPage() {

  return (
    <div className="w-full space-y-6">

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Suppliers Cataloag
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your Suppliers.
          </p>
        </div>

        <AddSupplier />
      </div>
      <SupplierUi />
    </div>

  )
}
