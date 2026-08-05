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



// GET SUPPLIERS

export function useSuppliers() {

  return useQuery({

    queryKey: ["suppliers"],

    queryFn: getSuppliers,

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
