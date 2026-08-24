export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  description: string;
  price: number;
  costPrice: number;

  category: {
    id: string;
    name: string;
  };
};

export type ProductForm = {
  id?: string;
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  costPrice?: number;
  description?: string;
};
export type ProductFilters = {
  search?: string;
  categoryId?: string;
  productId?: string;
  minPrice?: number;
  maxPrice?: number;
  createdAt?: string;
  page?: number | string;
  limit?: number | string;
};
export type updateProductData = {
  id: string;
  data: ProductForm;
}

