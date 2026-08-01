"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
});


type CategoryForm = z.infer<typeof categorySchema>;


export default function AddCategory() {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues:{
      name:"",
      description:""
    }
  });



  const onSubmit: SubmitHandler<CategoryForm> = async(data)=>{

    const res = await fetch("/api/categories",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });


    const result = await res.json();

    console.log(result);

    reset();
  };


  return (
    <Dialog>
<DialogTrigger
  render={
    <Button variant="outline">
      Add Category
    </Button>
  }
/>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Add Category
          </DialogTitle>

          <DialogDescription>
            Create a new product category
          </DialogDescription>
        </DialogHeader>


        <form onSubmit={handleSubmit(onSubmit)}>

          <FieldGroup className="space-y-4">


            <Field>
              <FieldLabel>
                Category Name
              </FieldLabel>

              <Input
                placeholder="Electronics"
                {...register("name")}
              />
            </Field>



            <Field>
              <FieldLabel>
                Description (optional)
              </FieldLabel>

              <Input
                placeholder="Electronic devices and accessories"
                {...register("description")}
              />
            </Field>


          </FieldGroup>



          <DialogFooter className="mt-5">

            <Button type="submit">
              Save Category
            </Button>

          </DialogFooter>


        </form>


      </DialogContent>


    </Dialog>
  );
}