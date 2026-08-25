
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { useSuppliers } from "@/hooks/use-supplier";
import { useProducts } from "@/hooks/use-products";
import { useCreatePurchase } from "@/hooks/use-purchase";



type PurchaseForm = {
  supplierId: string;
  productId: string;
  quantity: number;
  costPrice: number;
};



export function AddPurchase() {


  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");



  // suppliers
  const {
    data: suppliers,
    isLoading: supplierLoading,
  } = useSuppliers();
  const supplierList = (Array.isArray(suppliers) ? suppliers : (suppliers as any)?.data) ?? [];

  // products
  const {
    data: products,
    isLoading: productLoading,
  } = useProducts();
  const productList = (Array.isArray(products) ? products : (products as any)?.data) ?? [];


  const {
    mutate,
    isPending,
  } = useCreatePurchase();




  const {
    register,
    handleSubmit,
    control,
    reset,

  } = useForm<PurchaseForm>({

    defaultValues: {

      supplierId: "",
      productId: "",
      quantity: 0,
      costPrice: 0,

    },

  });







  function onSubmit(data: PurchaseForm) {


    setSuccess("");
    setError("");



    mutate(

      {

        supplierId: data.supplierId,


        items: [

          {

            productId: data.productId,

            quantity: data.quantity,

            costPrice: data.costPrice,

          }

        ],

      },


      {

        onSuccess() {

          setSuccess(
            "Purchase created successfully"
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


      <DialogTrigger
        render={
          <Button>
            New Purchase
          </Button>
        }
      />



      <DialogContent>


        <form onSubmit={handleSubmit(onSubmit)}>


          <DialogHeader>

            <DialogTitle>
              Create Purchase
            </DialogTitle>


            <DialogDescription>
              Add stock from supplier
            </DialogDescription>


          </DialogHeader>





          {
            success && (

              <div className="mt-3 rounded bg-green-50 p-3 text-green-700">

                {success}

              </div>

            )
          }




          {
            error && (

              <div className="mt-3 rounded bg-red-50 p-3 text-red-700">

                {error}

              </div>

            )
          }






          <div className="space-y-4 mt-5">





            {/* Supplier */}

            <Label>
              Supplier
            </Label>


            <Controller

              name="supplierId"

              control={control}


              render={({ field }) => (


                <Select

                  value={field.value}

                  onValueChange={field.onChange}

                >


                  <SelectTrigger>

                    <SelectValue placeholder="Select supplier" />

                  </SelectTrigger>



                  <SelectContent>


                    {
                      supplierLoading ?


                        <SelectItem value="loading">

                          Loading...

                        </SelectItem>


                        :
                        supplierList.map((supplier: any) => (
                          <SelectItem
                            key={supplier.id}
                            value={supplier.id}
                          >
                            {supplier.name}
                          </SelectItem>
                        ))
                    }
                  </SelectContent>


                </Select>


              )}


            />








            {/* Product */}

            <Label>
              Product
            </Label>


            <Controller

              name="productId"

              control={control}


              render={({ field }) => (


                <Select

                  value={field.value}

                  onValueChange={field.onChange}

                >


                  <SelectTrigger>

                    <SelectValue placeholder="Select product" />

                  </SelectTrigger>




                  <SelectContent>


                    {
                      productLoading ?


                        <SelectItem value="loading">

                          Loading...

                        </SelectItem>


                        :
                        productList.map((product: any) => (
                          <SelectItem
                            key={product.id}
                            value={product.id}
                          >
                            {product.name}
                          </SelectItem>
                        ))
                    }
                  </SelectContent>


                </Select>


              )}

            />








            {/* Quantity */}

            <Label>
              Quantity
            </Label>


            <Input

              type="number"

              {...register(
                "quantity",
                {
                  valueAsNumber: true
                }
              )}

            />








            {/* Cost Price */}

            <Label>
              Cost Price
            </Label>


            <Input

              type="number"

              {...register(
                "costPrice",
                {
                  valueAsNumber: true
                }
              )}

            />



          </div>






          <DialogFooter className="mt-6">


            <Button

              type="submit"

              disabled={isPending}

            >

              {
                isPending
                  ?
                  "Saving..."
                  :
                  "Save Purchase"
              }


            </Button>


          </DialogFooter>




        </form>


      </DialogContent>


    </Dialog>


  );

}
