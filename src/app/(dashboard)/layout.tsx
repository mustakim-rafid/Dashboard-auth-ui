export const dynamic = "force-dynamic";

import DashboardLayoutClient from "@/components/module/dashboard/DashboardLayoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donezo - Dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  )
}