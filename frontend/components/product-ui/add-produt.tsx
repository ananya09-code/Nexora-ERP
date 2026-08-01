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
import {useForm,SubmitHandler} from "react-hook-form"
import {z} from "zod"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState,useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle } from "lucide-react";

const form = z.object({
  name: z.string().min(2),

  sku: z.string().min(2),

  categoryId: z.string(),

  price: z.coerce.number(),

  costPrice: z.coerce.number().optional(),

  description: z.string().optional(),
});
type Category = {
  id: string;
  name: string;
};
type ProudctForm=z.infer<typeof form>
export function AddProductDialog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {

  async function fetchCategories() {

    try {
      const res = await fetch("/api/categories");

      const data = await res.json();

      setCategories(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCategories(false);
    }

  }


  fetchCategories();

}, []);









 const {register,handleSubmit,control,formState:{isSubmitting}}=useForm<ProudctForm>({ defaultValues: {
    name: "",
    sku: "",
    categoryId: "",   
    price: 0,
    costPrice: 0,
    description: "",
  },})
const onSubmit: SubmitHandler<ProudctForm> = async (data) => {
  setSuccess("");
  setError("");

  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add product");
    }

    setSuccess("Product added successfully!");

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
        transition-colors
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
              Add a new product to the system.
            </DialogDescription>
          </DialogHeader>


          <FieldGroup className="mt-5 space-y-4">


            {/* Product Name */}
            <Field>
              <Label htmlFor="name">
                Product Name
              </Label>

              <Input
                id="name"
                placeholder="HP Laptop"
                {...register("name")}
              />
            </Field>



            {/* SKU */}
            <Field>
              <Label htmlFor="sku">
                SKU
              </Label>

              <Input
                id="sku"
                placeholder="HP-840-G5"
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
        {loadingCategories ? (
          <SelectItem value="loading" disabled>
            Loading categories...
          </SelectItem>
        ) : (
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>

    </Select>
  )}
/>

</Field>


            {/* Selling Price */}
            <Field>
              <Label htmlFor="price">
                Selling Price
              </Label>

              <Input

                {...register("price")}
                id="price"
                name="price"
                type="number"
                placeholder="45000"
              />
            </Field>



            {/* Cost Price */}
            <Field>
              <Label htmlFor="costPrice">
                Cost Price
              </Label>

              <Input
              
                {...register("costPrice")}
                id="costPrice"
                name="costPrice"
                type="number"
                placeholder="40000"
              />
            </Field>



            {/* Description */}
            <Field>

              <Label htmlFor="description">
                Description
                <span className="ml-2 text-sm text-slate-400">
                  (optional)
                </span>
              </Label>


              <Textarea

                {...register("description")}
                id="description"
                name="description"
                placeholder="Add product details..."
                rows={4}
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
      " disabled={isSubmitting} type="submit">
    {isSubmitting?"adding product...":"Add Product"}
  </Button>

</DialogFooter> 


        </form>


      </DialogContent>


    </Dialog>
  );
}