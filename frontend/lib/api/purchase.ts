
export type Purchase = {
  id: string;
  supplierId: string;
  totalAmount: number;
  status: string;
  createdAt: string;

  supplier: {
    name: string;
  };

  items: {
    id: string;
    quantity: number;
    costPrice: number;

    product: {
      name: string;
    };

  }[];
};


export type PurchaseForm = {

  supplierId: string;


  items: {

    productId: string;

    quantity: number;

    costPrice: number;

  }[];

};

import { PurchaseFilters } from "@/hooks/use-purchase";



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
