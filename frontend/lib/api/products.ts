export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  description: string;
  price: number;
  costPrice: number;

  category: {
    id: string;
    name: string;
  };
};

export type ProductForm = {
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  costPrice?: number;
  description?: string;
};

// GET PRODUCTS
export async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// CREATE PRODUCT
export async function createProduct(data: ProductForm): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create product");
  }

  return result;
}
