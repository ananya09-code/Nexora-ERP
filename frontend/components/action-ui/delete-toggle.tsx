"use client";
import { Trash2, AlertTriangle } from "lucide-react";



import { useDeleteSupplier } from "@/hooks/use-supplier";
import { useDeleteProduct } from "@/hooks/use-products";
import { useDeleteCategory } from "@/hooks/use-categories";
import { useDeleteCustomer } from "@/hooks/use-customer";


import { SuccessMessage } from "@/components/states-ui/success";
import { ErrorMessage } from "@/components/states-ui/error";

import { useState } from "react"
import { DetailsTypeKey } from "./details-toggle";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { success } from "zod";
type delateToggleProps = {
  data: any;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedtype: DetailsTypeKey;
}
export function DeleteToggle({
  data,
  deleteOpen,
  setDeleteOpen,
  selectedtype,
}: delateToggleProps) {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const deleteCustomer = useDeleteCustomer()
  const deleteProduct = useDeleteProduct()
  const deleteSupplier = useDeleteSupplier()



  const deleteCategory = useDeleteCategory();

  const handleType = (selectedtype: string) => {
    switch (selectedtype) {
      case "product":
        return deleteProduct;
      case "customer":
        return deleteCustomer;
      case "supplier":
        return deleteSupplier;
      case "category":
        return deleteCategory;
      default:
        return null;
    }
  };

  const mutation = handleType(selectedtype);
  const handelDelete = async () => {
    setSuccess("");
    setError("");

    try {
      await mutation?.mutateAsync(data.id);

      setSuccess(`${selectedtype} deleted successfully!`);
    }
    catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    }
  }



  return (
    <>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>

        <AlertDialogContent className="max-w-md">
          {success && (
            <SuccessMessage value={success} />
          )}

          {error && (
            <ErrorMessage value={error} />
          )}


          <AlertDialogHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <AlertDialogTitle className="text-lg">
                  Delete {selectedtype}?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-1">
                  This action cannot be undone.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="rounded-md border bg-muted/40 p-3">
            <p className="text-sm text-muted-foreground">
              You are about to permanently delete:
            </p>

            <p className="mt-1 font-medium">
              {data.name}
            </p>
          </div>

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={handelDelete}
              disabled={mutation?.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {mutation?.isPending ? "Deleting..." : `Delete ${selectedtype}`}

            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );

}

