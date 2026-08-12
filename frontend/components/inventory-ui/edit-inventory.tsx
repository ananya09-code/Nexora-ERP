"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useUpdateInventory } from "@/hooks/use-inventory";

import { CheckCircle, XCircle } from "lucide-react";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

type AdjustInventoryProps = {
  inventory: any;
};

const form = z.object({
  productId: z.string(),
  adjustment: z.coerce.number(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

type InventoryForm = z.infer<typeof form>;

export function AdjustInventory({
  inventory,
}: AdjustInventoryProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const updateinventory = useUpdateInventory();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<InventoryForm>();

  const onSubmit: SubmitHandler<InventoryForm> = async (data) => {
    setError("");
    setSuccess("");

    try {
      await updateinventory.mutateAsync(data);

      setSuccess("Inventory updated successfully!");

      reset();
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button variant="outline">
          Adjust Stock
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Adjust Inventory
            </DialogTitle>
          </DialogHeader>

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

          <div className="space-y-4 py-4">

            {/* Product */}
            <div className="space-y-2">
              <Label>Product</Label>

              <Input
                value={inventory?.product?.name ?? ""}
                disabled
              />

              <input
                type="hidden"
                {...register("productId")}
                value={inventory?.productId ?? ""}
              />
            </div>

            {/* Current Quantity */}
            <div className="space-y-2">
              <Label>Current Quantity</Label>

              <Input
                value={inventory?.quantity ?? 0}
                disabled
              />
            </div>

            {/* Adjustment */}
            <div className="space-y-2">
              <Label htmlFor="adjustment">
                Adjustment
              </Label>

              <Input
                id="adjustment"
                type="number"
                placeholder="+10 or -10"
                {...register("adjustment")}
              />
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">
                Reason
              </Label>

              <Input
                id="reason"
                placeholder="e.g. Damaged stock"
                {...register("reason")}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">
                Notes
              </Label>

              <Input
                id="notes"
                placeholder="Additional notes..."
                {...register("notes")}
              />
            </div>

          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateinventory.isPending}
            >
              {updateinventory.isPending
                ? "Adjusting stock..."
                : "Adjust Stock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

