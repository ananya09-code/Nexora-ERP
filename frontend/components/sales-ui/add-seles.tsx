"use client";

import { CheckCircle, XCircle } from "lucide-react";
import type { Product } from "@/lib/types/producttype";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Sales } from "@/lib/types/salestype";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateSales } from "@/hooks/use-sales";
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCustomers } from "@/hooks/use-customer";
export function AddSales() {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const [selectedProduct, setSelectedProduct] = useState("");
  const [totalProduct, setTotalProduct] = useState<Product[]>([])
  const [selectedcustomer, setSelectedCustomer] = useState("")
  const [quantitys, setQuantity] = useState<Record<string, number>>({});




  const {
    data: products,
    isLoading: productLoading,
  } = useProducts();



  const { data: customers,
    isLoading: customerLoading,
  } = useCustomers();

  const { mutate, isPending } = useCreateSales()



  const subtotal = totalProduct.reduce((sum, product) => {
    const quantity = quantitys[product.id] ?? 1;
    return sum + quantity * product.costPrice;
  }, 0);



  const totalQuantity = Object.values(quantitys).reduce(
    (sum, quantity) => sum + quantity,
    0
  );


  function reset() {
    setSelectedCustomer("")
    setTotalProduct([])
    setQuantity({})
    setSelectedProduct("")
  }


  const items = totalProduct.map((product) => ({
    productId: product.id,
    quantity: quantitys[product.id] ?? 1,
    price: product.costPrice,
  }));


  const data = {
    customerId: selectedcustomer,
    status: 'completed',
    item: items,

  }


  function onSubmit(data: Sales) {


    setSuccess("");
    setError("");

    mutate(

      data
      ,
      {

        onSuccess() {

          setSuccess(
            "Sales created successfully"
          );

          reset();

        },


        onError(error) {

          setError(
            error.message
          );

        },


      }


    );

  }





  return (

    <Dialog>


      <DialogTrigger >

        <Button>
          New Sale
        </Button>

      </DialogTrigger>





      <DialogContent
        className="
        w-[95vw]
        min-w-[1500px]
        max-h-[90vh]
        overflow-y-auto
        "
      >


        <DialogHeader>

          <DialogTitle className="text-2xl">
            Create New Sale
          </DialogTitle>


          <DialogDescription>
            Create a new customer order and update inventory.
          </DialogDescription>


          {success && (
            <div className="flex gap-2 items-center rounded-md bg-green-50 p-3 text-green-700">
              <CheckCircle size={18} />
              {success}
            </div>
          )}


          {error && (
            <div className="flex gap-2 items-center rounded-md bg-red-50 p-3 text-red-700">
              <XCircle size={18} />
              {error}
            </div>
          )}




        </DialogHeader>






        <div
          className="
          grid
          gap-8
          lg:grid-cols-[1fr_380px]
          mt-6
          "
        >

          {/* LEFT SIDE */}


          <div className="space-y-8">





            {/* CUSTOMER */}


            <Card>


              <CardHeader>

                <CardTitle>
                  Customer
                </CardTitle>


                <CardDescription>
                  Select customer for this sale.
                </CardDescription>


              </CardHeader>
              <CardContent>
                <Select value={selectedcustomer}
                  onValueChange={(value) =>
                    setSelectedCustomer(value ?? "")
                  }

                >
                  <SelectTrigger className="w-full">

                    <SelectValue
                      placeholder="Select Customer"
                    />

                  </SelectTrigger>




                  <SelectContent>


                    {customerLoading ? <h1>Loading......</h1> : customers?.data ?? [].map((customer: any) => (

                      <SelectItem
                        key={customer.id}
                        value={customer.id}

                      >

                        {`${customer.firstName} ${customer.lastName}`}

                      </SelectItem>

                    ))}


                  </SelectContent>


                </Select>



              </CardContent>


            </Card>







            {/* PRODUCTS */}



            <Card>


              <CardHeader>

                <CardTitle>
                  Products
                </CardTitle>


                <CardDescription>
                  Add products to sale.
                </CardDescription>


              </CardHeader>





              <CardContent className="space-y-5">



                <Select
                  value={selectedProduct}
                  onValueChange={(value) => {
                    setSelectedProduct(value || "");
                    const product = products?.data ?? [].find(
                      (item: any) => item.id === value
                    );

                    if (product) {

                      const alreadyExists = totalProduct.some(
                        (item) => item.id === product.id
                      );

                      if (!alreadyExists) {
                        setTotalProduct([
                          ...totalProduct,
                          product
                        ]);
                        setQuantity((prev) => ({
                          ...prev,
                          [product.id]: 1,
                        }));
                      }

                    }
                  }}
                >


                  <SelectTrigger className="w-full">

                    <SelectValue
                      placeholder="Select Product"
                    />

                  </SelectTrigger>




                  <SelectContent>
                    {productLoading ? <h1>loading.......</h1> : products?.data ?? [].map((product: any) => (

                      <SelectItem
                        key={product.id}
                        value={product.id}
                      >

                        {product.name}

                      </SelectItem>

                    ))}


                  </SelectContent>


                </Select>







                <div className="border rounded-lg overflow-x-auto">


                  <Table className="min-w-[800px]">


                    <TableHeader>


                      <TableRow>


                        <TableHead>
                          Product
                        </TableHead>


                        <TableHead>
                          Price
                        </TableHead>


                        <TableHead>
                          Quantity
                        </TableHead>


                        <TableHead>
                          Total
                        </TableHead>


                        <TableHead className="text-right">
                          Action
                        </TableHead>


                      </TableRow>


                    </TableHeader>





                    <TableBody>


                      {
                        totalProduct.map((product) => {
                          return (
                            <TableRow
                              key={product.id}
                            >


                              <TableCell>

                                {product.name}

                              </TableCell>





                              <TableCell>

                                {product.costPrice}

                              </TableCell>





                              <TableCell className="w-32">


                                <Input
                                  type="number"
                                  min={1}
                                  value={quantitys[product.id] ?? 1}
                                  onChange={(e) =>
                                    setQuantity((prev) => ({
                                      ...prev,
                                      [product.id]: Number(e.target.value),
                                    }))
                                  }
                                />


                              </TableCell>





                              <TableCell>
                                {(quantitys[product.id] ?? 1) * product.costPrice}
                              </TableCell>





                              <TableCell className="text-right">
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    setTotalProduct(
                                      totalProduct.filter(
                                        (item) => item.id !== product.id
                                      ));
                                    setQuantity((prev) => {
                                      const { [product.id]: _, ...rest } = prev;
                                      return rest;
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                              </TableCell>




                            </TableRow>)

                        })}




                    </TableBody>


                  </Table>


                </div>


              </CardContent>


            </Card>



          </div>








          {/* RIGHT SIDE SUMMARY */}





          <Card className="h-fit sticky top-5">


            <CardHeader>


              <CardTitle>
                Order Summary
              </CardTitle>



              <CardDescription>
                Review before completing sale.
              </CardDescription>


            </CardHeader>





            <CardContent className="space-y-5">





              <div className="flex justify-between">

                <span>
                  Items
                </span>


                <span>
                  {totalQuantity}
                </span>


              </div>







              <div className="flex justify-between">


                <span>
                  Subtotal
                </span>



                <span>

                  {subtotal}
                </span>


              </div>






              <div className="flex justify-between">


                <span>
                  Tax
                </span>


                <span>
                  $0
                </span>


              </div>





              <Separator />







              <div
                className="
                flex
                justify-between
                text-xl
                font-bold
                "
              >

                <span>
                  Total
                </span>


                <span>
                  {`$${subtotal}`}
                </span>


              </div>







              <Button
                className="w-full h-12 text-base"
                onClick={
                  () => onSubmit(data)
                } variant="outline"
              >
                {isPending ? "Commpleting sale ...." : "Complete Sale"}

              </Button>



            </CardContent>



          </Card>





        </div>







        <DialogFooter className="mt-8">


          <DialogClose >


            <Button onClick={() => { setSuccess(""); setError("") }}>

              Cancel

            </Button>


          </DialogClose>



        </DialogFooter>





      </DialogContent>





    </Dialog>

  );
}
