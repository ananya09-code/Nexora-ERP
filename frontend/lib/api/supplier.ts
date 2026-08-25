import { SupplierForm, SupplierFilters, Supplier, updateSupplierData } from "@/lib/types/suppliertype";




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

  if (filters?.page) {
    params.set("page", filters.page.toString())
  }
  if (filters?.limit) {
    params.set("limit", filters.limit.toString())
  }


  const res = await fetch(`/api/suppliers?${params.toString()}`);


  if (!res.ok) {
    throw new Error("Failed to fetch suppliers");
  }

  const result = await res.json();

  return { data: result?.data ?? [], meta: result?.meta }
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

export async function updateSupplier(data: updateSupplierData) {
  const id = data?.id
  const res = await fetch(`/api/suppliers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  })
  if (!res.ok) {
    throw new Error("Failed to update supplier");
  }

  return res.json();
}
export async function deleteSupplier(id: string) {
  const response = await fetch(`/api/suppliers/${id}/archive`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to archive customer");
  }
  return response.json();
}

