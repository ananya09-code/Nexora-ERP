
"use client";
import { getInventory, getInventorySummary, updateInventory, adjustInventory } from "@/lib/api/inventory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryFilters, InventoryForm, updateInventoryData } from "@/lib/types/inventorytype";

export function useInventory(filters?: InventoryFilters) {
  return useQuery({ queryKey: ["inventory", filters], queryFn: () => getInventory(filters) });
}

export function useUpdateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: updateInventoryData) => updateInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inventory-summary"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });
    },
  });
}

export function useAdjustInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: string; adjustment: number; reason?: string; notes?: string }) =>
      adjustInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inventory-summary"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });
    },
  });
}

export function useSummaryInventory() {
  return useQuery({ queryKey: ["inventory-summary"], queryFn: getInventorySummary });
}

