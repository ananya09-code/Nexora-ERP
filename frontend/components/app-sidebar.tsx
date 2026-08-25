"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  Users,
  Truck,
  ShoppingBag,
  TrendingUp,
  UserCircle,
  Building2,
  ExternalLink,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();
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

  const navigation = [
    {
      group: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      group: "Catalog & Stock",
      items: [
        {
          title: "Products",
          href: "/dashboard/products",
          icon: Package,
        },
        {
          title: "Categories",
          href: "/dashboard/categories",
          icon: FolderTree,
        },
        {
          title: "Inventory",
          href: "/dashboard/inventory",
          icon: Boxes,
        },
      ],
    },
    {
      group: "Commerce & Finance",
      items: [
        {
          title: "Sales Orders",
          href: "/dashboard/sales",
          icon: TrendingUp,
        },
        {
          title: "Purchases",
          href: "/dashboard/purchases",
          icon: ShoppingBag,
        },
      ],
    },
    {
      group: "Directory",
      items: [
        {
          title: "Customers",
          href: "/dashboard/customers",
          icon: Users,
        },
        {
          title: "Suppliers",
          href: "/dashboard/Suppliers",
          icon: Truck,
        },
      ],
    },
    {
      group: "Account",
      items: [
        {
          title: "Profile",
          href: "/dashboard/profile",
          icon: UserCircle,
        },
      ],
    },
  ];

  return (
    <Sidebar className="border-r border-slate-200/80 bg-white">
      {/* Brand Header */}
      <SidebarHeader className="border-b border-slate-100 px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Nexora <span className="text-blue-600">ERP</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 mt-0.5">Enterprise Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation Sections */}
      <SidebarContent className="px-3 py-2 space-y-4">
        {navigation.map((section) => (
          <SidebarGroup key={section.group} className="p-0">
            <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.group}
            </SidebarGroupLabel>

            <SidebarGroupContent className="mt-1">
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        render={<Link href={item.href} />}
                        className={`w-full justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-semibold shadow-xs hover:bg-blue-100/80 hover:text-blue-800"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer User Widget */}
      <SidebarFooter className="border-t border-slate-100 p-3">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors w-full"
        >
          <Avatar className="h-8 w-8 border border-blue-400">
            <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left overflow-hidden flex-1">
            <span className="text-xs font-semibold text-slate-900 truncate">
              {user?.name || "System Admin"}
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              {user?.email || "admin@nexora.com"}
            </span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

