"use client";

import { useState } from "react";
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

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldGroup,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CheckCircle, XCircle } from "lucide-react";


const FormData = z.object({
  name: z.string(),
  contactPerson: z.string().optional(),
  phone: z.string(),
  address: z.string(),
  email: z.email(),
});

type SupplierForm = z.infer<typeof FormData>;


export default function AddSupplier() {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SupplierForm>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
  });



  const onSubmit: SubmitHandler<SupplierForm> = async (data) => {

    setSuccess("");
    setError("");


    try {

      const res = await fetch("/api/suppliers", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });



      const result = await res.json();


      if (!res.ok) {
        throw new Error(
          result.message || "Failed to add supplier"
        );
      }


      setSuccess("Supplier added successfully!");

      console.log(result);


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
            variant="outline"
            className="
              bg-blue-500 
              text-white 
              border-blue-500
              hover:bg-blue-600
              hover:text-white
            "
          >
            Add Supplier
          </Button>
        }
      />


      <DialogContent className="sm:max-w-md">

        <form onSubmit={handleSubmit(onSubmit)}>


          <DialogHeader>

            <DialogTitle>
              Add Supplier
            </DialogTitle>


            {success && (
              <div className="
                mt-4 flex items-center gap-2 
                rounded-md bg-green-50 p-3 
                text-sm text-green-700
              ">
                <CheckCircle size={18} />
                {success}
              </div>
            )}


            {error && (
              <div className="
                mt-4 flex items-center gap-2 
                rounded-md bg-red-50 p-3 
                text-sm text-red-700
              ">
                <XCircle size={18} />
                {error}
              </div>
            )}


            <DialogDescription>
              Add a new supplier to the system.
            </DialogDescription>


          </DialogHeader>



          <FieldGroup className="mt-5 space-y-4">


            {/* Supplier Name */}

            <Field>

              <Label>
                Supplier Name
              </Label>

              <Input
                placeholder="ABC Trading"
                {...register("name")}
              />

            </Field>



            {/* Email */}

            <Field>

              <Label>
                Email
              </Label>

              <Input
                type="email"
                placeholder="supplier@gmail.com"
                {...register("email")}
              />

            </Field>
            <Field>
              <Label>
                Contact Person
              </Label>

              <Input
                placeholder="John Doe"
                {...register("contactPerson")}
              />
            </Field>


            {/* Phone */}

            <Field>

              <Label>
                Phone Number
              </Label>

              <Input
                placeholder="0912345678"
                {...register("phone")}
              />

            </Field>



            {/* Address */}

            <Field>

              <Label>
                Address
              </Label>

              <Input
                placeholder="Addis Ababa, Ethiopia"
                {...register("address")}
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
              className="
                bg-blue-500 
                text-white 
                border-blue-500
                hover:bg-blue-600
              "
              disabled={isSubmitting}
              type="submit"
            >

              {isSubmitting
                ? "Adding Supplier..."
                : "Add Supplier"
              }

            </Button>


          </DialogFooter>



        </form>


      </DialogContent>


    </Dialog>

  );

}
