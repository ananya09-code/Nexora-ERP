export const categoryDetails = {
  title: "Category Details",
  sections: [
    {
      title: "Category Information",
      fields: [
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
      ],
    },
    {
      title: "Products",
      fields: [
        { label: "Products", key: "_count.products" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};

export const productDetails = {
  title: "Product Details",
  sections: [
    {
      title: "Product Information",
      fields: [
        { label: "Name", key: "name" },
        { label: "SKU", key: "sku" },
        { label: "Barcode", key: "barcode" },
        { label: "Category", key: "category.name" },
        { label: "Description", key: "description" },
      ],
    },
    {
      title: "Pricing",
      fields: [
        { label: "Selling Price", key: "price", type: "currency" },
        { label: "Cost Price", key: "costPrice", type: "currency" },
      ],
    },
    {
      title: "Inventory",
      fields: [
        { label: "Quantity", key: "inventory.quantity" },
        { label: "Minimum Stock", key: "inventory.minStock" },
        { label: "Unit", key: "inventory.unit" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};

export const inventoryDetails = {
  title: "Inventory Details",
  sections: [
    {
      title: "Product Information",
      fields: [
        { label: "Product", key: "product.name" },
        { label: "SKU", key: "product.sku" },
        { label: "Category", key: "product.category.name" },
      ],
    },
    {
      title: "Stock Information",
      fields: [
        { label: "Quantity", key: "quantity" },
        { label: "Minimum Stock", key: "minStock" },
        { label: "Unit", key: "unit" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};

export const supplierDetails = {
  title: "Supplier Details",
  sections: [
    {
      title: "Supplier Information",
      fields: [
        { label: "Name", key: "name" },
        { label: "Contact Person", key: "contactPerson" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Address", key: "address" },
      ],
    },
  ],
};

export const customerDetails = {
  title: "Customer Details",
  sections: [
    {
      title: "Customer Information",
      fields: [
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Address", key: "address" },
      ],
    },
    {
      title: "Sales",
      fields: [
        { label: "Total Sales", key: "_count.sales" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};

export const saleDetails = {
  title: "Sale Details",
  sections: [
    {
      title: "Sale Information",
      fields: [
        { label: "Sale ID", key: "id" },
        { label: "Customer", key: "customer.firstName" },
        { label: "Status", key: "status" },
        { label: "Total Amount", key: "totalAmount", type: "currency" },
      ],
    },
    {
      title: "Items",
      fields: [
        { label: "Number of Items", key: "_count.items" },
        { label: "Product", key: "items.0.product.name" },
        { label: "Quantity", key: "items.0.quantity" },
        { label: "Price", key: "items.0.price", type: "currency" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};

export const purchaseDetails = {
  title: "Purchase Details",
  sections: [
    {
      title: "Purchase Information",
      fields: [
        { label: "Purchase ID", key: "id" },
        { label: "Supplier", key: "supplier.name" },
        { label: "Total Amount", key: "totalAmount", type: "currency" },
      ],
    },
    {
      title: "Items",
      fields: [
        { label: "Number of Items", key: "_count.items" },
        { label: "Product", key: "items.0.product.name" },
        { label: "Quantity", key: "items.0.quantity" },
        { label: "Cost Price", key: "items.0.costPrice", type: "currency" },
      ],
    },
    {
      title: "Dates",
      fields: [
        { label: "Created", key: "createdAt", type: "date" },
        { label: "Updated", key: "updatedAt", type: "date" },
      ],
    },
  ],
};
