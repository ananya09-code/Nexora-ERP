

import { PurchaseForm, Purchase, PurchaseFilters, updatePurchaseData } from "@/lib/types/purchasetype";

// Get all purchases

export async function getPurchases(filters: PurchaseFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.productId) {
    params.set("productId", filters.productId);
  }

  if (filters?.supplierId) {
    params.set("supplierId", filters.supplierId);
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
    params.set("page", String(filters.page));
  }
  if (filters?.limit) {
    params.set("limit", String(filters.limit));
  }


  const res = await fetch(`/api/purchases?${params.toString()}`);

  const result = await res.json();

  if (!res.ok) {

    throw new Error(
      "Failed to fetch purchases"
    );

  }

  return {
    data: result?.data ?? [],
    meta: result?.meta,
  };
}






// Create purchase

export async function createPurchase(
  data: PurchaseForm
) {


  const res = await fetch(
    "/api/purchases",
    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },


      body: JSON.stringify(data),

    }
  );



  const result = await res.json();




  if (!res.ok) {

    throw new Error(
      result.error || "Failed to create purchase"
    );

  }



  return result;

}

export async function updatePurchase(data: updatePurchaseData) {
  const id = data?.id
  const res = await fetch(`/api/purchases/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  })
  if (!res.ok) {
    throw new Error("Failed to update purchase");
  }

  return res.json();
}
