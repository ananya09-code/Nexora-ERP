"use client";
import { CheckCircle } from "lucide-react";
export function SuccessMessage({ value }: { value: string }) {
  if (!value) return null;

  return (
    <div className="flex gap-2 items-center rounded-md bg-green-50 p-3 text-green-700">
      <CheckCircle size={18} />
      {value}
    </div>
  );
}
