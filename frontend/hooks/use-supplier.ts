"use client";


import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getSuppliers,
  createSupplier,
  SupplierForm,
} from "@/lib/api/supplier";
export type SupplierFilters = {
  search?: string;
  suppliersId?: string;
  email?: string;
  createdAt?: string;
};


// GET SUPPLIERS

export function useSuppliers(filters?: SupplierFilters) {

  return useQuery({

    queryKey: ["suppliers", filters],

    queryFn: () => getSuppliers(filters),

  });

}



// ADD SUPPLIER

export function useCreateSupplier() {

  const queryClient = useQueryClient();



  return useMutation({

    mutationFn: (data: SupplierForm) =>
      createSupplier(data),



    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["suppliers"],

      });

    },

  });

}
