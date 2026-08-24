import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSales, CreateSale, updateSale } from "@/lib/api/sales"
import { SaleFilters, Sales, updateSaleData } from "@/lib/types/salestype"

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
export function useUpdateSales() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newdata: updateSaleData) => updateSale(newdata),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['sales'] }) }
  })
}
