
export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Sales {
  customerId: string;
  status: string;
  item: SaleItem[];
}
import { SaleFilters } from "@/hooks/use-sales";
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


  const res = await fetch(`/api/sales?${params.toString()}`)
  if (!res.ok) {
    throw new Error(
      "Failed to fetch purchases")
  }

  return res.json()

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
