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
import { EditToggle } from "@/components/action-ui/edit-toggle";
import { EditTypeKey } from "@/components/action-ui/edit-toggle";
type AppActionProps = {
  data: any;
  settype: DetailsTypeKey | EditTypeKey;
}
export function AppAction({ data, settype }: AppActionProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleDetails = () => {
    setMenuOpen(false);
    setTimeout(() => {
      setDetailsOpen(true);
    }, 0);
  };
  const handleEdit = () => {
    setMenuOpen(false);
    setTimeout(() => {
      setEditOpen(true);
    }, 0);
  }
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

          <DropdownMenuItem onClick={handleEdit}>
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
      <EditToggle
        data={data}
        open={editOpen}
        datatype={settype}
        onOpenChange={setEditOpen} /> </>
  );
}
