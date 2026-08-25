"use client";


import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { SupplierFilters, SupplierForm, updateSupplierData } from "@/lib/types/suppliertype";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/lib/api/supplier";
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
export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newdata: updateSupplierData) => updateSupplier(newdata),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['suppliers'] }) }
  })
}
export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}
