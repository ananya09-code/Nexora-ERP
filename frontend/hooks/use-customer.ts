"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getCustomers,
  createCustomer,
  CustomerForm,
} from "@/lib/api/customer";



// GET CUSTOMERS

export function useCustomers() {

  return useQuery({

    queryKey: ["customers"],

    queryFn: getCustomers,

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
