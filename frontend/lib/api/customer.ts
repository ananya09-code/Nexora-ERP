import { updateCustomerData, Customer, CustomerForm, CustomerFilters } from "@/lib/types/customertype";
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
  if (filters?.page) {
    params.set("page", String(filters.page))
  }

  if (filters?.limit) {
    params.set("limit", String(filters.limit))
  }

  const res = await fetch(`/api/customers/?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }
  const result = await res.json();
  return { data: result?.data ?? [], meta: result.meta }
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

} export async function updateCustomer(data: updateCustomerData) {
  const id = data?.id
  const res = await fetch(`/api/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  })
  if (!res.ok) {
    throw new Error("Failed to update Customer");
  }

  return res.json();
}
export async function deleteCustomer(id: string) {
  const response = await fetch(`/api/customers/${id}/archive`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to archive customer");
  }
  return response.json();
}

