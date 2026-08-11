
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

export async function getPurchases(filters: PurchaseFilters): Promise<Purchase[]> {
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



  const res = await fetch(`/api/purchases?${params.toString()}`);


  if (!res.ok) {

    throw new Error(
      "Failed to fetch purchases"
    );

  }


  return res.json();

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
