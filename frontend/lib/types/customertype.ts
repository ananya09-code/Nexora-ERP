
export type CustomerFilters = {
  search?: string;
  customerId?: string;
  email?: string;
  createdAt?:
  string;
  page?: number | string;
  limit?: number | string;
};
export type updateCustomerData = {
  id: string;
  data: CustomerForm;
}
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

