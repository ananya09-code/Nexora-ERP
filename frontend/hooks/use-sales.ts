import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSales, CreateSale } from "@/lib/api/sales"
import { Sales } from "@/lib/api/sales"
export type SaleFilters = {
  search?: string;
  status?: "completed" | "pending" | "cancelled";
  customerId?: string;
  productId?: string;
  minAmount?: number;
  maxAmount?: number;
  createdAt?: string;
  page?: number;
  limit?: number;
};

export function useSales(filters: SaleFilters) {
  return useQuery(
    {
      queryKey: ["sales", filters],
      queryFn: () => getSales(filters),
    })
}


export function useCreateSales() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Sales) => CreateSale(data)
    , onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] })
    }
  })
}
