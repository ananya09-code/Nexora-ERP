
import { productDetails, customerDetails, saleDetails, purchaseDetails, inventoryDetails, supplierDetails } from "@/lib/edit-data";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const DetailsType = {
  product: productDetails,
  customer: customerDetails,
  sale: saleDetails,
  purchase: purchaseDetails,
  inventory: inventoryDetails,
  supplier: supplierDetails,
}
export type DetailsTypeKey = keyof typeof DetailsType;

type DetailsToggleProps = {
  selectedtype: DetailsTypeKey;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any
};
export function DetailsToggle({
  open,
  onOpenChange,
  selectedtype,
  data,
}: DetailsToggleProps) {
  const details = DetailsType[selectedtype]
  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((value, key) => value?.[key], obj);
  };
  console.log(data)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle> {details?.title}</DialogTitle>

              <DialogDescription>
                View the details of this {selectedtype}.
              </DialogDescription>
            </div>

          </div>
        </DialogHeader>
        {
          details?.sections.map((section: any, index: any) => (
            <div>

              <h3 className="font-semibold mb-3">
                {section.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">
                {section.fields.map((field: any, index: any) => {
                  const value = getValue(data, field.key);
                  return (

                    <div>
                      <p className="text-sm text-muted-foreground">
                        {field.label}
                      </p>

                      <p>
                        {value ?? "_ _"}
                      </p>
                    </div>
                  )
                })
                }
              </div>


            </div>



          ))


        }
      </DialogContent>
    </Dialog>
  );
}

