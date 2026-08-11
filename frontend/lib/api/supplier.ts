export type Supplier = {
  id: string;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
};


export type SupplierForm = {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
};

import { SupplierFilters } from "@/hooks/use-supplier";

// GET SUPPLIERS

export async function getSuppliers(filters?: SupplierFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.suppliersId) {
    params.set("supplierid", filters.suppliersId);
  }

  if (filters?.email) {
    params.set("email", filters.email);
  }

  if (filters?.createdAt) {
    params.set("createdat", filters.createdAt);
  }




  const res = await fetch(`/api/suppliers?${params.toString()}`);


  if (!res.ok) {
    throw new Error("Failed to fetch suppliers");
  }


  return res.json();

}



// CREATE SUPPLIER

export async function createSupplier(
  data: SupplierForm
): Promise<Supplier> {


  const res = await fetch("/api/suppliers", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),

  });



  const result = await res.json();



  if (!res.ok) {

    throw new Error(
      result.message || "Failed to create supplier"
    );

  }



  return result;

}
