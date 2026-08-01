import { AppSidebar } from "@/components/app-sidebar";
import { Appheader } from "@/components/app-header";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          <Appheader />
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}