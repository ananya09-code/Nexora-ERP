
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
export async function getSales() {

  const res = await fetch("/api/sales")
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
