export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};


export type CustomerForm = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
};


// GET CUSTOMERS
export async function getCustomers(): Promise<Customer[]> {

  const res = await fetch("/api/customers");

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  return res.json();
}



// CREATE CUSTOMER
export async function createCustomer(
  data: CustomerForm
): Promise<Customer> {


  const res = await fetch("/api/customers", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),

  });



  const result = await res.json();


  if (!res.ok) {

    throw new Error(
      result.message || "Failed to create customer"
    );

  }


  return result;

}
