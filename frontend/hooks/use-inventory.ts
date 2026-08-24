
"use client";
import { getInventory, getInventorySummary } from "@/lib/api/inventory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateInventory } from "@/lib/api/inventory";
import { useQueryClient } from "@tanstack/react-query";
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

    }
  })


}

export function useSummaryInventory() {
  return useQuery({ queryKey: ["inventory-summary"], queryFn: getInventorySummary })
}
