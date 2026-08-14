
"use client";
import { getInventory, getInventorySummary } from "@/lib/api/inventory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateInventory } from "@/lib/api/inventory";
import { useQueryClient } from "@tanstack/react-query";
export type InventoryFilters = {
  search?: string;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
  productId?: string;
  unit?: "pieces" | "kg" | "g" | "liter" | "meter";
};


export function useInventory(filters?: InventoryFilters) {
  return useQuery({ queryKey: ["inventory", filters], queryFn: () => getInventory(filters) });
}

export type matadata = {
  page: number;
  limit: number;
  totalpages: number;
  total: number
}

export type InventoryForm = {
  productId: string;
  adjustment: number;
  reason?: string;
  notes?: string;
  meta?: matadata[]
}
export function useUpdateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InventoryForm) => updateInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

    }
  })


}

export function useSummaryInventory() {
  return useQuery({ queryKey: ["inventory-summary"], queryFn: getInventorySummary })
}
