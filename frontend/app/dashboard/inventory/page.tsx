import { prisma } from "@/lib/prisma";

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


export default async function InventoryPage() {


  const inventory = await prisma.inventory.findMany({

    include: {
      product: {
        include: {
          category: true,
        },
      },
    },

  });



  const totalItems = inventory.length;



  return (

    <div className="p-6 space-y-6">


      <div>

        <h1 className="text-2xl font-bold">
          Inventory
        </h1>

        <p className="text-gray-500">
          Manage your product stock
        </p>

      </div>




      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        <div className="rounded-lg border p-4">

          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <p className="text-2xl font-bold">
            {totalItems}
          </p>

        </div>



        <div className="rounded-lg border p-4">

          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <p className="text-2xl font-bold">
            {
              inventory.filter(
                item =>
                  item.quantity <= item.minStock &&
                  item.quantity > 0
              ).length
            }
          </p>

        </div>




        <div className="rounded-lg border p-4">

          <p className="text-sm text-gray-500">
            Out Of Stock
          </p>

          <p className="text-2xl font-bold">
            {
              inventory.filter(
                item => item.quantity === 0
              ).length
            }
          </p>

        </div>


      </div>





      <Table>


        <TableCaption>
          Inventory List
        </TableCaption>



        <TableHeader>

          <TableRow>


            <TableHead>
              Product
            </TableHead>


            <TableHead>
              SKU
            </TableHead>


            <TableHead>
              Category
            </TableHead>


            <TableHead>
              Quantity
            </TableHead>


            <TableHead>
              Unit
            </TableHead>


            <TableHead>
              Status
            </TableHead>


          </TableRow>

        </TableHeader>





        <TableBody>


          {inventory.map((item) => (


            <TableRow key={item.id}>


              <TableCell>
                {item.product.name}
              </TableCell>



              <TableCell>
                {item.product.sku}
              </TableCell>



              <TableCell>
                {item.product.category.name}
              </TableCell>



              <TableCell>
                {item.quantity}
              </TableCell>



              <TableCell>
                {item.unit}
              </TableCell>



              <TableCell>

                {
                  item.quantity === 0
                    ? "Out of Stock"
                    : item.quantity <= item.minStock
                      ? "Low Stock"
                      : "Good"
                }

              </TableCell>



            </TableRow>


          ))}



        </TableBody>





        <TableFooter>

          <TableRow>

            <TableCell colSpan={5}>
              Total Inventory Items
            </TableCell>


            <TableCell>
              {inventory.length}
            </TableCell>


          </TableRow>

        </TableFooter>



      </Table>


    </div>

  );
}
