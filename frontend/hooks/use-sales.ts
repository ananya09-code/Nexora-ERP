import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSales, CreateSale } from "@/lib/api/sales"
import type { sales } from "@/lib/api/sales";
export function useSales() {
  return useQuery(
    {
      queryKey: ["sales"],
      queryFn: getSales,
    })
}


export function useCreateSales() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: sales) => CreateSale(data)
    , onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] })
    }
  })
}
