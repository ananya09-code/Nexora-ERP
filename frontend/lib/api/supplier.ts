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



// GET SUPPLIERS

export async function getSuppliers(): Promise<Supplier[]> {

  const res = await fetch("/api/suppliers");


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
