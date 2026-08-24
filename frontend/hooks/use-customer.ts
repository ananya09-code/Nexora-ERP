"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
} from "@/lib/api/customer";

import { CustomerFilters, CustomerForm, updateCustomerData } from "@/lib/types/customertype";





// GET CUSTOMERS

export function useCustomers(filter?: CustomerFilters) {

  return useQuery({

    queryKey: ["customers", filter],

    queryFn: () => getCustomers(filter),

  });

}



// ADD CUSTOMER

export function useCreateCustomer() {

  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: (data: CustomerForm) =>
      createCustomer(data),


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["customers"],

      });

    },

  });

}
export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newdata: updateCustomerData) => updateCustomer(newdata),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['customers'] }) }
  })
}
