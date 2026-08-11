import { ProductFilters } from "@/hooks/use-products";
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

export async function getProducts(filters?: ProductFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.categoryId) {
    params.set("categoryId", filters.categoryId);
  }

  if (filters?.productId) {
    params.set("productId", filters.productId);
  }

  if (filters?.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters?.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters?.createdAt) {
    params.set("createdAt", filters.createdAt);
  }

  const res = await fetch(
    `/api/products?${params.toString()}`
  );

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
