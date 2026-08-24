import { XCircle } from "lucide-react";

export function ErrorMessage({ value }: { value: string }) {
  if (!value) return null;

  return (
    <div className="flex gap-2 items-center rounded-md bg-red-50 p-3 text-red-700">
      <XCircle size={18} />
      {value}
    </div>
  );
}
