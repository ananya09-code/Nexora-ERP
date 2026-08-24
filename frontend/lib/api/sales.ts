
import { Sales, SaleFilters, updateSaleData } from "@/lib/types/salestype";
export async function getSales(filters: SaleFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.productId) {
    params.set("productId", filters.productId);
  }

  if (filters?.customerId) {
    params.set("customerId", filters.customerId);
  }

  if (filters?.minAmount !== undefined) {
    params.set("minAmount", String(filters.minAmount));
  }

  if (filters?.minAmount !== undefined) {
    params.set("maxAmount", String(filters.maxAmount));
  }

  if (filters?.createdAt) {
    params.set("createdAt", filters.createdAt);
  }
  if (filters?.page) {
    params.set("page", String(filters.page))
  }
  if (filters?.limit) {
    params.set("limit", String(filters.limit))
  }

  const res = await fetch(`/api/sales?${params.toString()}`)
  if (!res.ok) {
    throw new Error(
      "Failed to fetch purchases")
  }
  const result = await res.json()
  return {
    data: result?.data ?? []
    , meta: result.meta
  }

}



export async function CreateSale(data: Sales) {
  const res = await fetch("/api/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, body: JSON.stringify(data)
  })
  const result = await res.json()

  if (!res.ok) {
    throw new Error(
      result.error || "Failed to create purchase"

    )
  }
}
export async function updateSale(data: updateSaleData) {
  const id = data?.id
  const res = await fetch(`/api/sales/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  })
  if (!res.ok) {
    throw new Error("Failed to update Sale");
  }

  return res.json();
}
