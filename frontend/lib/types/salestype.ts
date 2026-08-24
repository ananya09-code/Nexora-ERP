
export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Sales {
  customerId: string;
  status: string;
  item: SaleItem[];
}
export type SaleFilters = {
  search?: string;
  status?: "completed" | "pending" | "cancelled";
  customerId?: string;
  productId?: string;
  minAmount?: number;
  maxAmount?: number;
  createdAt?: string;
  page?: number;
  limit?: number;
};
export type updateSaleData = {
  id: string;
  data: Sales;
}
