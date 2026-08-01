import { Search } from "lucide-react"
import { UserNav } from "./user-nav";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function Searchinput() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        className="border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <InputGroupAddon className="border-blue-300 text-blue-600">
        <Search className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupAddon
        align="inline-end"
        className="border-blue-300 text-blue-600"
      >
        12 results
      </InputGroupAddon>
    </InputGroup>
  );
}


export function Appheader() {
  return (
    <div className="flex flex-1 items-center">
        <div className="hidden md:block">
      <Searchinput /></div>
      <div className="ml-auto">
        <UserNav/>
      </div>
    </div>
  );
}
