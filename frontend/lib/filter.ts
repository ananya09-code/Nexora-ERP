// filters.ts

export const filters = {
  products: [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "product",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "price",
      label: "Price",
      type: "range",
    },
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],

  categories: [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],

  inventory: [
    {
      key: "stock",
      label: "Stock status",
      type: "select",
      options: [
        "In stock",
        "Low stock",
        "Out of stock",
      ],
    },
    {
      key: "product",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "unit",
      label: "Unit",
      type: "select",
      options: [
        "pcs",
        "kg",
        "g",
        "liter",
        "meter",
      ],
    },
  ],

  suppliers: [
    {
      key: "supplier",
      label: "Supplier",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],

  customers: [
    {
      key: "customer",
      label: "Customer",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],

  sales: [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        "completed",
        "pending",
        "cancelled",
      ],
    },
    {
      key: "customer",
      label: "Customer",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "product",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "amount",
      label: "Total amount",
      type: "range",
    },
    {
      key: "createdAt",
      label: "Sale date",
      type: "date",
    },
  ],

  purchases: [
    {
      key: "supplier",
      label: "Supplier",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "product",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "amount",
      label: "Total amount",
      type: "range",
    },
    {
      key: "createdAt",
      label: "Purchase date",
      type: "date",
    },
  ],
};
