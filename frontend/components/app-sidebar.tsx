import Link from "next/link";
import { Button } from "./ui/button";
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

export function AppSidebar() {
  return (
    <Sidebar>

      <SidebarHeader>
        <h2 className="text-xl text-blue-700 font-bold">
          Nexora ERP
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel>
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton >
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton >
                  <Link href="/dashboard/products">
                    Products
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton >
                  <Link href="/dashboard/customers">
                    Customers
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/dashboard/orders">
                    Orders
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>

      </SidebarFooter>

    </Sidebar>
  );
}