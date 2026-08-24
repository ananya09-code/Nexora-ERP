export type InventoryFilters = {
  search?: string;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
  productId?: string;
  unit?: "pieces" | "kg" | "g" | "liter" | "meter";
  page?: number;
  limit?: number;
};


export type InventoryForm = {
  productId: string;
  adjustment: number;
  reason?: string;
  notes?: string;
}
export type updateInventoryData = {
  data: InventoryForm;
  id: string;
}
