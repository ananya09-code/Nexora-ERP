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

export type CustomerFilters = {
  search?: string;
  customerId?: string;
  email?: string;
  createdAt?:
  string;
  page?: number | string;
  limit?: number | string;
};

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
