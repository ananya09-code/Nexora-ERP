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
  const { data: products, isPending, error } =
    useProducts({ ...filterValues, page, limit });

  return (<div className="w-full space-y-6">
    <FilterCard pagetype="products" onApply={setFilterValues} />
    <ProductTable data={products?.data ?? []} isLoading={isPending} error={error} />
    {
      (products?.meta && (<AppPagination meta={products.meta} selectedPage={setPage} />))
    }
  </div>
  )
} 
