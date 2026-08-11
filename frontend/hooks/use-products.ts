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
    queryFn: () => getProducts(filters)
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
