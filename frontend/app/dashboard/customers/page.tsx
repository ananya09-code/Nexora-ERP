import AddCustomer from "@/components/customer-ui/add-Customer"
import { CustomerTable } from "@/components/customer-ui/customer-table"
export default function CustomerPage() {

  return (
    <div className="w-full space-y-6">

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Customer Cataloag
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your Customer, Order, and Delivery.
          </p>
        </div>
        <AddCustomer />
      </div>

      <CustomerTable />
    </div>
  )

}
