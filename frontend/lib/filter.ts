// filters.ts
export const filters = {
  products: [
    {
      key: "categoryId",
      label: "Category",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "productId",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "minPrice",
      label: "Min price",
      type: "number",
    },
    {
      key: "maxPrice",
      label: "Max price",
      type: "number",
    },
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],

  categories: [
    {
      key: "createdAt",
      label: "Created date",
      type: "date",
    },
  ],
  inventory: [
    {
      key: "stockStatus",
      label: "Stock status",
      type: "select",
      options: [
        {
          label: "In Stock",
          value: "in-stock",
        },
        {
          label: "Low Stock",
          value: "low-stock",
        },
        {
          label: "Out of Stock",
          value: "out-of-stock",
        },
      ],
    },
    {
      key: "productId",
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
        {
          label: "Pieces",
          value: "pcs",
        },
        {
          label: "Kilograms",
          value: "kg",
        },
        {
          label: "Grams",
          value: "g",
        },
        {
          label: "Liters",
          value: "liter",
        },
        {
          label: "Meters",
          value: "meter",
        },
      ],
    },
  ],
  suppliers: [
    {
      key: "supplierId",
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
      key: "customerId",
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
      key: "customerId",
      label: "Customer",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "productId",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "minAmount",
      label: "Min amount",
      type: "number",
    },
    {
      key: "maxAmount",
      label: "Max amount",
      type: "number",
    },
    {
      key: "createdAt",
      label: "Sale date",
      type: "date",
    },
  ],

  purchases: [
    {
      key: "supplierId",
      label: "Supplier",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "productId",
      label: "Product",
      type: "select",
      options: [],
      dynamic: true,
    },
    {
      key: "minAmount",
      label: "Min amount",
      type: "number",
    },
    {
      key: "maxAmount",
      label: "Max amount",
      type: "number",
    },
    {
      key: "createdAt",
      label: "Purchase date",
      type: "date",
    },
  ],
} as const;
;
