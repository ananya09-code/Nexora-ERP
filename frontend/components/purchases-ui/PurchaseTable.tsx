"use client";

import { AppAction } from "../app-Action";
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


import { usePurchases } from "@/hooks/use-purchase";





export function PurchaseTable({ isLoading, error, purchases }: any) {

  if (isLoading) {

    return (
      <p>
        Loading purchases...
      </p>
    );

  }





  if (error) {

    return (
      <p className="text-red-500">
        Failed to load purchases
      </p>
    );

  }







  return (

    <Table>


      <TableCaption>
        Purchase History
      </TableCaption>





      <TableHeader>


        <TableRow>


          <TableHead>
            Supplier
          </TableHead>


          <TableHead>
            Items
          </TableHead>


          <TableHead>
            Date
          </TableHead>


          <TableHead >
            Total
          </TableHead>
          <TableHead className="text-right">
            Actions
          </TableHead>

        </TableRow>


      </TableHeader>







      <TableBody>



        {
          purchases.map((purchase: any) => (


            <TableRow
              key={purchase.id}
            >



              <TableCell className="font-medium">

                {purchase.supplier.name}

              </TableCell>





              <TableCell>

                {
                  purchase.items?.length ?? 0
                }

              </TableCell>





              <TableCell>

                {
                  new Date(
                    purchase.createdAt
                  ).toLocaleDateString()
                }

              </TableCell>





              <TableCell className="text-right">


                {purchase.totalAmount}


              </TableCell>


              <TableCell>

                <AppAction settype="purchase" data={purchase} />

              </TableCell>


            </TableRow>


          ))

        }




      </TableBody>







      <TableFooter>


        <TableRow>


          <TableCell colSpan={3}>

            Total Purchases

          </TableCell>




          <TableCell className="text-right">

            {purchases.length}

          </TableCell>




        </TableRow>


      </TableFooter>





    </Table>


  );
}
import { FilterCard } from "@/components/app-filter"
import { useState } from "react";
import { AppPagination } from "../app-Pagination";
export function PurchaseUi() {

  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    data: purchases,
    isLoading,
    error,

  } = usePurchases({ ...filterValues, page, limit });
  console.log(purchases)
  return (
    <div className="flex flex-col gap-4">
      <FilterCard
        pagetype="purchases"
        onApply={setFilterValues}
      />

      <PurchaseTable
        isLoading={isLoading}
        error={error}
        purchases={purchases?.data ?? []}
      />

      {purchases?.meta && (
        <AppPagination
          setLimit={setLimit}
          meta={purchases.meta}
          selectedPage={setPage}
        />
      )}
    </div>
  )

}

