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
import { useForm, SubmitHandler } from "react-hook-form"
import { email, string, z } from "zod"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CheckCircle, XCircle } from "lucide-react";

const FormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  Address: z.string(),
  email: z.email(),
})
type customerForm = z.infer<typeof FormData>
function AddCustomer() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<customerForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      Address: "",
      email: "",
    }
  })
  const onSubmit: SubmitHandler<customerForm> = async (data) => {
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add customer");
      }

      setSuccess("Customer added successfully!");

      console.log(result);

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
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
        transition-colors
      "
          >
            Add Customer
          </Button>
        }
      />


      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Add Customer
            </DialogTitle>
            {success && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle size={18} />
                {success}
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                <XCircle size={18} />
                {error}
              </div>
            )}



            <DialogDescription>
              Add a new Customer to the system.
            </DialogDescription>
          </DialogHeader>


          <FieldGroup className="mt-5 space-y-4">


            {/* first Name */}
            <Field>
              <Label htmlFor="fristName">
                First Name
              </Label>

              <Input
                id="firstname"
                placeholder="ananya"
                {...register("firstName")}
              />
            </Field>



            {/* lastname*/}
            <Field>
              <Label htmlFor="sku">
                Last Name
              </Label>

              <Input
                id="lastname"
                placeholder="mengistu"

                {...register('lastName')}
              />
            </Field>


            {/* email */}
            <Field>
              <Label htmlFor="email">
                Email
              </Label>

              <Input

                id="email"
                type="email"
                placeholder="ananyamengistu@gmail.com"
                {...register('email')}

              />
            </Field>



            {/* Phone number */}
            <Field>
              <Label htmlFor="phonenumber">
                Phone Number
              </Label>

              <Input

                id="phonenumber"
                type="text"
                placeholder="0947735304"

                {...register('phoneNumber')}
              />
            </Field>


            <Field>
              <Label htmlFor="address">

                Address
              </Label>

              <Input

                id="address"
                type="text"
                placeholder="addis ababa,ethiopa"

                {...register('Address')}
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

            <Button className="
        bg-blue-500 
        text-white 
        border-blue-500
        hover:bg-blue-600 
        hover:text-white
        transition-colors
      "
              disabled={isSubmitting}
              type="submit"
            >{isSubmitting ? "Adding Customer" : "Add Customer"}</Button>

          </DialogFooter>


        </form>

      </DialogContent>


    </Dialog>
  );

}
export default AddCustomer
