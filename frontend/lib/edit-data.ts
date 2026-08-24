export const categoryEdit = {
  title: "Edit Category",
  sections: [
    {
      title: "Category Information",
      fields: [
        { label: "Name", key: "name", type: "text", required: true },
        { label: "Description", key: "description", type: "textarea" },
      ],
    },
  ],
};

export const productEdit = {
  title: "Edit Product",
  sections: [
    {
      title: "Product Information",
      fields: [
        { label: "Name", key: "name", type: "text", required: true },
        { label: "SKU", key: "sku", type: "text", required: true },
        { label: "Barcode", key: "barcode", type: "text" },
        { label: "Category", key: "categoryId", type: "select", required: true },
        { label: "Description", key: "description", type: "textarea" },
      ],
    },
    {
      title: "Pricing",
      fields: [
        { label: "Selling Price", key: "price", type: "number", required: true },
        { label: "Cost Price", key: "costPrice", type: "number" },
      ],
    },
  ],
};

export const inventoryEdit = {
  title: "Adjust Inventory",
  sections: [
    {
      title: "Product Information",
      fields: [
        { label: "Product", key: "product.name", type: "text", readonly: true },
        { label: "SKU", key: "product.sku", type: "text", readonly: true },
      ],
    },
    {
      title: "Stock Information",
      fields: [
        { label: "Quantity", key: "quantity", type: "number", required: true },
        { label: "Minimum Stock", key: "minStock", type: "number", required: true },
        { label: "Unit", key: "unit", type: "text", required: true },
      ],
    },
  ],
};

export const supplierEdit = {
  title: "Edit Supplier",
  sections: [
    {
      title: "Supplier Information",
      fields: [
        { label: "Name", key: "name", type: "text", required: true },
        { label: "Contact Person", key: "contactPerson", type: "text" },
        { label: "Email", key: "email", type: "email" },
        { label: "Phone", key: "phone", type: "text" },
        { label: "Address", key: "address", type: "textarea" },
      ],
    },
  ],
};

export const customerEdit = {
  title: "Edit Customer",
  sections: [
    {
      title: "Customer Information",
      fields: [
        { label: "First Name", key: "firstName", type: "text", required: true },
        { label: "Last Name", key: "lastName", type: "text", required: true },
        { label: "Email", key: "email", type: "email" },
        { label: "Phone", key: "phone", type: "text" },
        { label: "Address", key: "address", type: "textarea" },
      ],
    },
  ],
};

export const saleEdit = {
  title: "Edit Sale",
  sections: [
    {
      title: "Sale Information",
      fields: [
        { label: "Customer", key: "customerId", type: "select", required: true },
        {
          label: "Status",
          key: "status",
          type: "select",
          options: [
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
        },
      ],
    },
    {
      title: "Items",
      fields: [
        { label: "Product", key: "items", type: "items" },
      ],
    },
  ],
};

export const purchaseEdit = {
  title: "Edit Purchase",
  sections: [
    {
      title: "Purchase Information",
      fields: [
        { label: "Supplier", key: "supplierId", type: "select", required: true },
      ],
    },
    {
      title: "Items",
      fields: [
        { label: "Product", key: "items", type: "items" },
      ],
    },
  ],
};
;
