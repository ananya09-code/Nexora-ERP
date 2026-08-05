"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/use-products";

export function ProductTable() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products.</p>;
  }
  return (

    <Table>


      <TableCaption>
        Product Catalog
      </TableCaption>



      <TableHeader>

        <TableRow>

          <TableHead>
            Name
          </TableHead>


          <TableHead>
            SKU
          </TableHead>


          <TableHead>
            Barcode
          </TableHead>


          <TableHead>
            Category
          </TableHead>


          <TableHead>
            Cost Price
          </TableHead>


          <TableHead className="text-right">
            Selling Price
          </TableHead>


        </TableRow>

      </TableHeader>





      <TableBody>


        {products.map((product) => (

          <TableRow key={product.id}>


            <TableCell className="font-medium">
              {product.name}
            </TableCell>



            <TableCell>
              {product.sku}
            </TableCell>



            <TableCell>
              {product.barcode || "-"}
            </TableCell>



            <TableCell>
              {product.category.name}
            </TableCell>



            <TableCell>
              {product.costPrice}
            </TableCell>



            <TableCell className="text-right">
              {product.price}
            </TableCell>



          </TableRow>

        ))}


      </TableBody>





      <TableFooter>

        <TableRow>

          <TableCell colSpan={5}>
            Total Products
          </TableCell>


          <TableCell className="text-right">
            {products.length}
          </TableCell>


        </TableRow>

      </TableFooter>



    </Table>

  );

}
