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

export function ProductTable({ data, isLoading, error }: any) {

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


        {data.map((product: any) => (

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
            {data.length}
          </TableCell>


        </TableRow>

      </TableFooter>



    </Table>

  );

}
import { FilterCard } from "@/components/app-filter"
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { AppPagination } from "@/components/app-Pagination";
export function ProductUi() {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10
  const { data: productsResponse = [], isPending, error } =
    useProducts({ ...filterValues, page, limit });

  const products = productsResponse?.data ?? [];
  return (<div className="w-full space-y-6">
    <FilterCard pagetype="products" onApply={setFilterValues} />
    <ProductTable data={products} isLoading={isPending} error={error} />
    <AppPagination selectedpage={setPage} meta={products.length} />
  </div>
  )
} 
