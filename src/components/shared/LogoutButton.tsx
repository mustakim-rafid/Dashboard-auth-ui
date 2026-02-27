"use client";

import { logoutUser } from "@/actions/auth/logout";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div>
      <Button
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        variant={"secondary"}
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;

{/* <Link
                key={`${item.href}-${item.label}`}
href={item.href}
onClick={onClose}
className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
>
<Icon className="w-5 h-5" />
{item.label}
</Link> */}
