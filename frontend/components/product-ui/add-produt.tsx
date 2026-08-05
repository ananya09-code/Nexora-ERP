"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldGroup,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

import { useCategories } from "@/hooks/use-categories";
import { useCreateProduct } from "@/hooks/use-products";


const form = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  categoryId: z.string(),
  price: z.coerce.number(),
  costPrice: z.coerce.number().optional(),
  description: z.string().optional(),
});


type ProductForm = z.infer<typeof form>;


export function AddProductDialog() {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const {
    data: categories = [],
    isLoading: loadingCategories,
  } = useCategories();


  const createProduct = useCreateProduct();


  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<ProductForm>({
    defaultValues: {
      name: "",
      sku: "",
      categoryId: "",
      price: 0,
      costPrice: 0,
      description: "",
    },
  });



  const onSubmit: SubmitHandler<ProductForm> = async (data) => {

    setSuccess("");
    setError("");

    try {

      await createProduct.mutateAsync(data);


      setSuccess("Product added successfully!");

      reset();


    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    }

  };



  return (

    <Dialog>

      <DialogTrigger
        render={
          <Button
            className="
              bg-blue-500
              text-white
              hover:bg-blue-600
            "
          >
            Add Product
          </Button>
        }
      />


      <DialogContent className="sm:max-w-md">


        <form onSubmit={handleSubmit(onSubmit)}>


          <DialogHeader>

            <DialogTitle>
              Add Product
            </DialogTitle>


            <DialogDescription>
              Add a new product to inventory.
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



          <FieldGroup className="mt-5 space-y-4">


            <Field>

              <Label>
                Product Name
              </Label>

              <Input
                placeholder="HP Laptop"
                {...register("name")}
              />

            </Field>



            <Field>

              <Label>
                SKU
              </Label>

              <Input
                placeholder="HP-840"
                {...register("sku")}
              />

            </Field>




            <Field>

              <Label>
                Category
              </Label>


              <Controller

                name="categoryId"

                control={control}

                render={({ field }) => (

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>


                    <SelectContent>

                      {
                        loadingCategories ?

                          (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          )

                          :

                          categories.map(category => (

                            <SelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>

                          ))

                      }


                    </SelectContent>


                  </Select>

                )}

              />


            </Field>




            <Field>

              <Label>
                Selling Price
              </Label>

              <Input
                type="number"
                {...register("price")}
              />

            </Field>




            <Field>

              <Label>
                Cost Price
              </Label>

              <Input
                type="number"
                {...register("costPrice")}
              />

            </Field>




            <Field>

              <Label>
                Description
              </Label>

              <Textarea
                {...register("description")}
                placeholder="Product details..."
              />

            </Field>



          </FieldGroup>




          <DialogFooter className="mt-6">


            <DialogClose
              render={
                <Button variant="outline">
                  Cancel
                </Button>
              }
            />



            <Button
              disabled={createProduct.isPending}
              type="submit"
              className="
                bg-blue-500
                text-white
                hover:bg-blue-600
              "
            >

              {
                createProduct.isPending
                  ? "Adding..."
                  : "Add Product"
              }

            </Button>


          </DialogFooter>


        </form>


      </DialogContent>


    </Dialog>

  );
}
