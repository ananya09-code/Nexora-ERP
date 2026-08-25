"use client";

import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Key,
  CheckCircle2,
  Lock,
  Activity,
  Fingerprint,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (isPending) {
    return (
      <div className="w-full space-y-6 max-w-4xl">
        <div className="h-32 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    );
  }

  const user = session?.user;
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "NX";

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full space-y-8 max-w-5xl">
      {/* Profile Header Banner */}
      <div className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 border-2 border-blue-500 shadow-md">
            <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {user?.name || "Nexora Administrator"}
              </h1>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 text-xs">
                ERP Administrator
              </Badge>
              {user?.emailVerified && (
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              {user?.email || "admin@nexora.com"}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 self-start sm:self-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal & Account Details */}
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              Account Details
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Personal credentials and profile identification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Full Name</span>
              <p className="text-sm font-semibold text-slate-900">{user?.name || "System User"}</p>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Primary Email</span>
              <p className="text-sm font-semibold text-slate-900">{user?.email || "N/A"}</p>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Account ID</span>
              <p className="text-xs font-mono text-slate-700 break-all">{user?.id || "N/A"}</p>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Account Created</span>
              <p className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Controls */}
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              Security & Role Access
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Authentication provider and administrative privileges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Assigned Privilege Level</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-slate-900">Enterprise Super Admin</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  Full Access
                </Badge>
              </div>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Authentication Protocol</span>
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-slate-400" />
                Better-Auth Session Token (HTTP-Only)
              </p>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Module Access Scopes</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Products Catalog</Badge>
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Live Inventory</Badge>
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Sales Invoicing</Badge>
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Procurement</Badge>
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Customer CRM</Badge>
                <Badge variant="outline" className="text-xs bg-white text-slate-700">Analytics</Badge>
              </div>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <span className="text-xs font-medium text-slate-500">Active Session Status</span>
              <p className="text-sm font-medium text-emerald-600 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                Active Authenticated Session
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
