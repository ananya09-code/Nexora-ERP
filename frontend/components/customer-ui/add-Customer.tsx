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
  useCreateCustomer
} from "@/hooks/use-customer";



type CustomerForm = {

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  address: string;

};



export default function AddCustomer() {


  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");



  const createCustomer = useCreateCustomer();



  const {
    register,
    handleSubmit,
    reset
  } = useForm<CustomerForm>();




  const onSubmit: SubmitHandler<CustomerForm>
    = async (data) => {


      setSuccess("");

      setError("");



      try {


        await createCustomer.mutateAsync(data);



        setSuccess(
          "Customer added successfully!"
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
            Add Customer
          </Button>
        }
      />



      <DialogContent>


        <form
          onSubmit={handleSubmit(onSubmit)}
        >


          <DialogHeader>

            <DialogTitle>
              Add Customer
            </DialogTitle>


            <DialogDescription>
              Create a new customer.
            </DialogDescription>


          </DialogHeader>



          {
            success &&

            <div className="flex gap-2 bg-green-50 p-3 text-green-700">

              <CheckCircle size={18} />

              {success}

            </div>

          }



          {
            error &&

            <div className="flex gap-2 bg-red-50 p-3 text-red-700">

              <XCircle size={18} />

              {error}

            </div>

          }



          <FieldGroup className="mt-5 space-y-4">



            <Field>

              <Label>
                First Name
              </Label>

              <Input
                placeholder="Ananya"
                {...register("firstName")}
              />

            </Field>




            <Field>

              <Label>
                Last Name
              </Label>

              <Input
                placeholder="Mengistu"
                {...register("lastName")}
              />

            </Field>




            <Field>

              <Label>
                Email
              </Label>

              <Input
                type="email"
                placeholder="email@gmail.com"
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
              disabled={createCustomer.isPending}
              type="submit"
              className="
bg-blue-500
text-white
hover:bg-blue-600
"
            >

              {
                createCustomer.isPending
                  ?
                  "Adding..."
                  :
                  "Add Customer"
              }

            </Button>


          </DialogFooter>



        </form>


      </DialogContent>


    </Dialog>

  );


}
