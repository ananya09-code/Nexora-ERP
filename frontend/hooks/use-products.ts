"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "@/lib/api/products";
import { ProductFilters, ProductForm, updateProductData } from "@/lib/types/producttype";
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
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newdata: updateProductData) => updateProduct(newdata),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }) }
  })
}
