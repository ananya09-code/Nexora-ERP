
"use client";
import { getInventory } from "@/lib/api/inventory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateInventory } from "@/lib/api/inventory";
import { useQueryClient } from "@tanstack/react-query";
export function useInventory() {
  return useQuery({ queryKey: ["inventory"], queryFn: getInventory });
}


export type InventoryForm = {
  productId: string;
  adjustment: number;
  reason?: string;
  notes?: string;
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
