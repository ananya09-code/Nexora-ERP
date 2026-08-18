import type { InventoryForm } from "@/hooks/use-inventory";
import { InventoryFilters } from "@/hooks/use-inventory";
export async function getInventory(filters?: InventoryFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.stockStatus) {
    params.set("stockStatus", filters.stockStatus);
  }

  if (filters?.productId) {
    params.set("productId", filters.productId);
  }

  if (filters?.unit) {
    params.set("unit", filters.unit);
  }
  if (filters?.page) {
    params.set("page", filters.page.toString());
  }
  if (filters?.limit) {
    params.set("limit", filters.limit.toString());
  }
  try {
    const query = params.toString();

    const response = await fetch(
      `/api/inventory${query ? `?${query}` : ""}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    const result = await response.json();
    return { data: result?.data ?? [], meta: result.meta };

  } catch (error) {
    throw new Error("Failed to fetch inventory");
  }
}

export async function updateInventory(data: InventoryForm) {
  try {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update inventory");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to update inventory");
  }
}
export async function getInventorySummary() {
  const response = await fetch("/api/inventory/summary");
  if (!response.ok) {
    throw new Error("Failed to fetch summary");


  }
  return response.json();
}
