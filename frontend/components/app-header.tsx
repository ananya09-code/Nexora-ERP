import { Search } from "lucide-react";
import { UserNav } from "./user-nav";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function Searchinput() {
  return (
    <InputGroup className="w-64 lg:w-80">
      <InputGroupAddon className="text-slate-400 pl-3">
        <Search className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Quick search across ERP..."
        className="text-xs border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </InputGroup>
  );
}

export function Appheader() {
  return (
    <div className="flex flex-1 items-center justify-between px-2">
      <div className="hidden md:block">
        <Searchinput />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <UserNav />
      </div>
    </div>
  );
}

