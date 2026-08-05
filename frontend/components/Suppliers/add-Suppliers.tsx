"use client";


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
  Field,
  FieldGroup,
} from "@/components/ui/field";


import {
  Input
} from "@/components/ui/input";


import {
  Label
} from "@/components/ui/label";


import {
  Button
} from "@/components/ui/button";


import {
  useForm,
  SubmitHandler
} from "react-hook-form";


import {
  useState
} from "react";


import {
  CheckCircle,
  XCircle
} from "lucide-react";


import {
  useCreateSupplier
} from "@/hooks/use-supplier";




type SupplierForm = {

  name: string;

  contactPerson: string;

  email: string;

  phone: string;

  address: string;

};



export default function AddSupplier() {


  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");



  const createSupplier = useCreateSupplier();



  const {
    register,
    handleSubmit,
    reset
  } = useForm<SupplierForm>();




  const onSubmit: SubmitHandler<SupplierForm>
    = async (data) => {


      setSuccess("");

      setError("");



      try {


        await createSupplier.mutateAsync(data);



        setSuccess(
          "Supplier added successfully!"
        );



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
            Add Supplier
          </Button>

        }
      />



      <DialogContent>


        <form
          onSubmit={handleSubmit(onSubmit)}
        >



          <DialogHeader>


            <DialogTitle>
              Add Supplier
            </DialogTitle>


            <DialogDescription>
              Add a supplier to your system.
            </DialogDescription>



          </DialogHeader>



          {
            success &&

            <div className="
flex gap-2 
items-center
bg-green-50
p-3
text-green-700
">

              <CheckCircle size={18} />

              {success}

            </div>

          }



          {
            error &&

            <div className="
flex gap-2 
items-center
bg-red-50
p-3
text-red-700
">

              <XCircle size={18} />

              {error}

            </div>

          }





          <FieldGroup className="mt-5 space-y-4">



            <Field>

              <Label>
                Supplier Name
              </Label>

              <Input

                placeholder="HP Ethiopia"

                {...register("name")}

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
                Phone
              </Label>


              <Input

                placeholder="0912345678"

                {...register("phone")}

              />


            </Field>





            <Field>

              <Label>
                Address
              </Label>


              <Input

                placeholder="Addis Ababa"

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

              type="submit"

              disabled={createSupplier.isPending}

              className="
bg-blue-500
text-white
hover:bg-blue-600
"

            >

              {
                createSupplier.isPending
                  ?
                  "Adding..."
                  :
                  "Add Supplier"
              }


            </Button>




          </DialogFooter>



        </form>


      </DialogContent>


    </Dialog>


  );


}
