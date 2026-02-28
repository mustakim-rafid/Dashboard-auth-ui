"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/shared/LogoutButton";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
];

const generalItems = [
  { icon: Settings, label: "Settings", href: "/dashboard" },
  { icon: HelpCircle, label: "Help", href: "/dashboard" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-4.5 border-b border-sidebar-border">
          <span className="font-semibold text-lg text-sidebar-foreground">
            Donezo
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* General Section */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          {generalItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <LogoutButton />
        </div>

        {/* Mobile App Promo */}
        <div className="m-4 bg-linear-to-br from-sidebar-primary to-sidebar-primary/90 rounded-2xl p-4 text-sidebar-primary-foreground">
          <h3 className="text-sm font-bold mb-2">Download our Mobile App</h3>
          <button className="bg-sidebar-primary-foreground text-sidebar-primary px-3 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </aside>
    </>
  );
}
