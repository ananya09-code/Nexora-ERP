export type SupplierFilters = {
  search?: string;
  suppliersId?: string;
  email?: string;
  createdAt?: string;
  page?: number;
  limit?: number;
};

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

export type updateSupplierData = {
  id: string;
  data: SupplierForm;
}
