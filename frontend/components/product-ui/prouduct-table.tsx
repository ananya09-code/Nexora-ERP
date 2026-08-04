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

import { useEffect, useState } from "react";


type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  description: string | null;
  price: number;
  costPrice: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };
};



export function ProductTable() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);



  useEffect(() => {

    async function fetchProducts() {

      try {

        const res = await fetch("/api/products");


        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }


        const data: Product[] = await res.json();

        setProducts(data);


      } catch (error) {

        console.log(error);

      } finally {

        setLoadingProduct(false);

      }

    }


    fetchProducts();

  }, []);




  if (loadingProduct) {
    return <p>Loading products...</p>;
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
