"use client";

import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  customerEdit,
  productEdit,
  supplierEdit,
  purchaseEdit,
  saleEdit,
  inventoryEdit,
} from "@/lib/edit-data";




import { useUpdateCustomer } from "@/hooks/use-customer";
import { useUpdateSales } from "@/hooks/use-sales";
import { useUpdatePurchase } from "@/hooks/use-purchase";
import { useUpdateInventory } from "@/hooks/use-inventory";
import { useUpdateSupplier } from "@/hooks/use-supplier";














import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProduct } from "@/hooks/use-products";
import { SuccessMessage } from "@/components/states-ui/success";
import { ErrorMessage } from "@/components/states-ui/error";






const EditType = {
  product: productEdit,
  customer: customerEdit,
  sale: saleEdit,
  purchase: purchaseEdit,
  inventory: inventoryEdit,
  supplier: supplierEdit,
};
import { DetailsTypeKey } from "./details-toggle";
export type EditTypeKey = keyof typeof EditType;

type EditToggleProps = {
  datatype: DetailsTypeKey | EditTypeKey;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
};
export function EditToggle({
  data,
  datatype,
  onOpenChange,
  open,
}: EditToggleProps) {

  const chosenType = EditType[datatype];
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedvalue, setUpdatedValue] = useState<any>({});

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //thid is called for the data
  const updateProduct = useUpdateProduct();
  const updateCustomer = useUpdateCustomer();
  const updateSale = useUpdateSales();
  const updatePurchase = useUpdatePurchase();
  const updateInventory = useUpdateInventory();
  const updateSupplier = useUpdateSupplier();




  const resetForm = () => {
    setUpdatedValue({});
    setEditingField(null);
  };





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedValue({
      ...updatedvalue,
      [e.target.name]: e.target.value,
    })
  }
  const handleType = (datatype: string) => {
    switch (datatype) {
      case "product":
        return updateProduct;
      case "customer":
        return updateCustomer;
      case "sale":
        return updateSale;

      case "purchase":
        return updatePurchase;
      case "inventory":
        return updateInventory;
      case "supplier":
        return updateSupplier;

      default:
        return null;
    }
  };
  const mutation = handleType(datatype);
  const handleSubmit = async () => {
    setSuccess("");
    setError("");

    try {
      await mutation?.mutateAsync({
        id: data.id,
        data: updatedvalue,
      });

      setSuccess("Changes saved successfully!");
      resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{chosenType.title}</DialogTitle>

        </DialogHeader>
        <SuccessMessage value={success} />
        <ErrorMessage value={error} />


        {chosenType?.sections.map((section) => (
          <div>
            <h3 className="font-semibold mb-3">
              {section.title}
            </h3>
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="m-2">{field.label}</Label>

                <div className="relative">
                  <Input
                    value={
                      editingField !== field.key
                        ? data[field.key] ?? ""
                        : updatedvalue?.[field.key] ?? ""
                    }
                    name={field.key}
                    onChange={handleChange}
                    disabled={editingField !== field.key}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setEditingField(field.key)}
                  >
                    <Pencil size={7} />
                  </Button>
                </div>
              </div>
            ))}

          </div>
        ))}
        <Button
          disabled={mutation?.isPending}
          onClick={handleSubmit}>
          {mutation?.isPending ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

