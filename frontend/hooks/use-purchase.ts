import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getPurchases,
  createPurchase,
  updatePurchase,
} from "@/lib/api/purchase";
import { PurchaseFilters, PurchaseForm, updatePurchaseData } from "@/lib/types/purchasetype";

// Fetch purchases

export function usePurchases(filters: PurchaseFilters) {


  return useQuery({


    queryKey: ["purchases", filters],


    queryFn: () => getPurchases(filters),


  });


}








// Create purchase

export function useCreatePurchase() {


  const queryClient = useQueryClient();



  return useMutation({



    mutationFn: (data: PurchaseForm) =>

      createPurchase(data),





    onSuccess: () => {


      // refresh purchase table

      queryClient.invalidateQueries({

        queryKey: ["purchases"],

      });




      // refresh inventory after purchase

      queryClient.invalidateQueries({

        queryKey: ["inventory"],

      });




      // refresh products if stock is displayed there

      queryClient.invalidateQueries({

        queryKey: ["products"],

      });



    },



  });



}
export function useUpdatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newdata: updatePurchaseData) => updatePurchase(newdata),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['purchases'] }) }
  })
}
