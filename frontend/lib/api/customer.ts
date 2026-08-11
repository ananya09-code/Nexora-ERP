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
import { CustomerFilters } from "@/hooks/use-customer";

// GET CUSTOMERS
export async function getCustomers(filters?: CustomerFilters) {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.customerId) {
    params.set("customerId", filters.customerId);
  }

  if (filters?.email) {
    params.set("email", filters.email);
  }

  if (filters?.createdAt) {
    params.set("createdAt", filters.createdAt);
  }



  const res = await fetch(`/api/customers/?${params.toString()}`);

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
