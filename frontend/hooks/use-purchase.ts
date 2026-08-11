import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getPurchases,
  createPurchase,
  PurchaseForm,
} from "@/lib/api/purchase";
export type PurchaseFilters = {
  search?: string;
  supplierId?: string;
  productId?: string;
  minAmount?: number;
  maxAmount?: number;
  createdAt?: string;
};




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
