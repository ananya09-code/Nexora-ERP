export type PurchaseFilters = {
  search?: string;
  supplierId?: string;
  productId?: string;
  minAmount?: number;
  maxAmount?: number;
  createdAt?: string;
  page?: number;
  limit?: number;
};



export type Purchase = {
  id: string;
  supplierId: string;
  totalAmount: number;
  status: string;
  createdAt: string;

  supplier: {
    name: string;
  };

  items: {
    id: string;
    quantity: number;
    costPrice: number;

    product: {
      name: string;
    };

  }[];
};


export type PurchaseForm = {

  supplierId: string;


  items: {

    productId: string;

    quantity: number;

    costPrice: number;

  }[];

};
export type updatePurchaseData = {
  id: string;
  data: PurchaseForm;
}
