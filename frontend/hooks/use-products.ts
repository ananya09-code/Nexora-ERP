"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  getProducts,
  ProductForm,
} from "@/lib/api/products";
export type ProductFilters = {
  search?: string;
  categoryId?: string;
  productId?: string;
  minPrice?: number;
  maxPrice?: number;
  createdAt?: string;
};

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        }
      });

      const response = await fetch(
        `/api/products?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
  });
}



export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductForm) => createProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
