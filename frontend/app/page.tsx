import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Boxes,
  TrendingUp,
  Users,
  Truck,
  BarChart3,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  Building2,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const modules = [
    {
      title: "Product Catalog",
      description:
        "Manage complete product lifecycle, SKUs, barcodes, cost and selling prices with hierarchical categorization.",
      icon: Package,
      badge: "Core",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      link: "/dashboard/products",
    },
    {
      title: "Real-time Inventory",
      description:
        "Track stock levels dynamically, set minimum thresholds, get automated low-stock warnings, and adjust quantities.",
      icon: Boxes,
      badge: "Operations",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      link: "/dashboard/inventory",
    },
    {
      title: "Sales & Invoicing",
      description:
        "Execute multi-item sales transactions, compute revenue automatically, and track order fulfillment statuses.",
      icon: TrendingUp,
      badge: "Revenue",
      color: "bg-violet-50 text-violet-700 border-violet-200",
      link: "/dashboard/sales",
    },
    {
      title: "Customer Management",
      description:
        "Maintain comprehensive customer profiles, contact info, transaction history, and purchasing frequency.",
      icon: Users,
      badge: "CRM",
      color: "bg-amber-50 text-amber-700 border-amber-200",
      link: "/dashboard/customers",
    },
    {
      title: "Supplier & Restock",
      description:
        "Manage vendor directories, issue purchase orders, and automatically sync stock replenishment into inventory.",
      icon: Truck,
      badge: "Procurement",
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      link: "/dashboard/Suppliers",
    },
    {
      title: "Executive Analytics",
      description:
        "Unified real-time dashboards with revenue aggregations, stock health metrics, top categories, and audit logs.",
      icon: BarChart3,
      badge: "Insights",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      link: "/dashboard",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Stock Synchronization",
      description:
        "Purchases automatically replenish inventory quantities while sales register instant order deductions.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Grade Security",
      description:
        "Robust session-based authentication, protected API routes, and relational integrity via PostgreSQL & Prisma.",
    },
    {
      icon: Layers,
      title: "Granular Categorization",
      description:
        "Organize products systematically across categories for high-precision filtering and inventory tracking.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Nexora <span className="text-blue-400">ERP</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#modules" className="hover:text-white transition-colors">
              Modules
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30">
                Launch App
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-8">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Next-Gen Enterprise Resource Planning</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Intelligent ERP for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Modern Commerce</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unified operations across Products, Live Stock, Sales, Procurement, and Customers with automated transaction synchronization.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-blue-600/40">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white px-8 h-12 text-base"
              >
                Sign In to Account
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur text-left">
              <p className="text-xs font-medium text-slate-400">Inventory Sync</p>
              <p className="text-2xl font-bold text-white mt-1">Real-time</p>
              <p className="text-xs text-emerald-400 mt-1">✓ Automated deductions</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur text-left">
              <p className="text-xs font-medium text-slate-400">Database Engine</p>
              <p className="text-2xl font-bold text-white mt-1">PostgreSQL</p>
              <p className="text-xs text-blue-400 mt-1">✓ Prisma ORM Relational</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur text-left">
              <p className="text-xs font-medium text-slate-400">Auth & Security</p>
              <p className="text-2xl font-bold text-white mt-1">Session-Auth</p>
              <p className="text-xs text-indigo-400 mt-1">✓ Protected middleware</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur text-left">
              <p className="text-xs font-medium text-slate-400">Architecture</p>
              <p className="text-2xl font-bold text-white mt-1">Next.js 16</p>
              <p className="text-xs text-cyan-400 mt-1">✓ App Router & TanStack</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Overview Section */}
      <section id="modules" className="py-20 bg-slate-950/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Complete ERP Suite
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              Engineered for Enterprise Operations
            </p>
            <p className="mt-4 text-slate-400">
              Each module is built to provide comprehensive CRUD functionality, instant searching, multi-criteria filtering, and live relational data sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Card
                  key={m.title}
                  className="bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/5 group text-slate-100"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                        {m.badge}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {m.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Integrated module</span>
                      <Link
                        href="/login"
                        className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Access Module
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/60"
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{feat.title}</h4>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="capabilities" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to explore Nexora ERP?
              </h3>
              <p className="mt-4 text-slate-300 max-w-xl mx-auto text-base">
                Log in to access real-time dashboards, product catalogs, customer relations, and automated inventory sync.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold shadow-lg shadow-blue-600/30">
                    Sign In to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:text-white hover:bg-slate-800 px-8 h-12">
                    Create New Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center">
              <Building2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-300">Nexora ERP</span>
            <span>— Enterprise Business Management</span>
          </div>
          <p>© 2026 Nexora ERP System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


