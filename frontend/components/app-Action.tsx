"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailsToggle } from "@/components/action-ui/details-toggle";
import { DetailsTypeKey } from "@/components/action-ui/details-toggle";
type AppActionProps = {
  data: any;
  settype: DetailsTypeKey;
}
export function AppAction({ data, settype }: AppActionProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetails = () => {
    setMenuOpen(false);

    setTimeout(() => {
      setDetailsOpen(true);
    }, 0);
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger >
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="left" align="start">
          <DropdownMenuItem onClick={handleDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DetailsToggle
        data={data}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        selectedtype={settype}
      />
    </>
  );
}
