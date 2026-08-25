"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User, LogOut, Shield } from "lucide-react";
import Link from "next/link";

export function UserNav() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  async function logout() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <div className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors">
          <Avatar className="h-9 w-9 border border-blue-400/80 shadow-xs">
            <AvatarFallback className="bg-blue-600 text-white font-semibold text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left md:block pr-2">
            <p className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.name || "Administrator"}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              {user?.email || "admin@nexora.com"}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-slate-900">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs leading-none text-slate-500">
              {user?.email || "admin@nexora.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer flex items-center"
        >
          <User className="mr-2 h-4 w-4 text-slate-500" />
          Profile & Account
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}