
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





// Get all purchases

export async function getPurchases(): Promise<Purchase[]> {


  const res = await fetch("/api/purchases");


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
