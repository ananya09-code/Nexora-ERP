
import { useEffect, useState } from "react";

export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  unit: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
