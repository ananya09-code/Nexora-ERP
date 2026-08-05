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


import { usePurchases } from "@/hooks/use-purchase";





export function PurchaseTable() {


  const {
    data: purchases = [],
    isLoading,
    error,

  } = usePurchases();





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


          <TableHead className="text-right">
            Total
          </TableHead>


        </TableRow>


      </TableHeader>







      <TableBody>



        {
          purchases.map((purchase) => (


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
