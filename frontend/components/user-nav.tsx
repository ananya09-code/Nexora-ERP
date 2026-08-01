"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export function UserNav() {

  const router = useRouter();


  async function logout() {

    await authClient.signOut();

    router.push("/login");

  }


  return (
    <DropdownMenu>

      <DropdownMenuTrigger>
        <Avatar className="border border-blue-400">
          <AvatarFallback>
            AD
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>


      <DropdownMenuContent align="end">

        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>


        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>


        <DropdownMenuItem
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>


      </DropdownMenuContent>

    </DropdownMenu>
  );
}