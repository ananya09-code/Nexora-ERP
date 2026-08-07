"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface SaleDetailsDialogProps {
  sale: any;
}


export function SaleDetailsDialog({
  sale,
}: SaleDetailsDialogProps) {

  return (
    <Dialog>

      <DialogTrigger >
        <Button
          variant="ghost"
          size="icon"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>


      <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>

          <div className="flex justify-between items-center">

            <div>
              <DialogTitle>
                Sale Details
              </DialogTitle>

              <DialogDescription>
                #{sale.id.slice(0, 8)}
              </DialogDescription>
            </div>


            <Badge className="capitalize">
              {sale.status}
            </Badge>

          </div>

        </DialogHeader>


        <div className="space-y-6">


          {/* Sale Summary */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Date
              </p>

              <p>
                {new Date(
                  sale.createdAt
                ).toLocaleDateString()}
              </p>
            </div>


            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Products
              </p>

              <p>
                {sale.items.length}
              </p>
            </div>


            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Quantity
              </p>

              <p>
                {sale.items.reduce(
                  (sum: number, item: any) =>
                    sum + item.quantity,
                  0
                )}
              </p>
            </div>


            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Total
              </p>

              <p className="font-bold">
                ETB {sale.totalAmount.toLocaleString()}
              </p>
            </div>

          </div>



          <Separator />



          {/* Customer */}

          <div>

            <h3 className="font-semibold mb-3">
              Customer Information
            </h3>


            <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">

              <div>
                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p>
                  {sale.customer.firstName}{" "}
                  {sale.customer.lastName}
                </p>
              </div>


              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p>
                  {sale.customer.email}
                </p>
              </div>


              <div>
                <p className="text-sm text-muted-foreground">
                  Phone
                </p>

                <p>
                  {sale.customer.phone || "-"}
                </p>
              </div>


              <div>
                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p>
                  {sale.customer.address || "-"}
                </p>
              </div>

            </div>

          </div>



          <Separator />



          {/* Products */}

          <div>

            <h3 className="font-semibold mb-3">
              Products
            </h3>


            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>
                    Product
                  </TableHead>

                  <TableHead>
                    SKU
                  </TableHead>

                  <TableHead>
                    Quantity
                  </TableHead>

                  <TableHead>
                    Price
                  </TableHead>

                  <TableHead className="text-right">
                    Subtotal
                  </TableHead>

                </TableRow>

              </TableHeader>



              <TableBody>

                {sale.items.map((item: any) => (

                  <TableRow key={item.id}>

                    <TableCell>
                      {item.product.name}
                    </TableCell>


                    <TableCell>
                      {item.product.sku}
                    </TableCell>


                    <TableCell>
                      {item.quantity}
                    </TableCell>


                    <TableCell>
                      ETB {item.price.toLocaleString()}
                    </TableCell>


                    <TableCell className="text-right">
                      ETB {
                        (
                          item.price *
                          item.quantity
                        ).toLocaleString()
                      }
                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </div>


        </div>

      </DialogContent>

    </Dialog>
  );
}
