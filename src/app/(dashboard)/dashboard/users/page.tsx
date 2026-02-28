import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { User } from "@/types";

export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`);

  const users: User[] = await res.json();

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Users
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage team members and their accounts
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 md:px-6 text-sm md:text-base whitespace-nowrap">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs md:text-sm font-semibold text-foreground pb-2 md:pb-3 px-3 md:px-4">
                    Name
                  </th>
                  <th className="hidden sm:table-cell text-left text-xs md:text-sm font-semibold text-foreground pb-2 md:pb-3 px-3 md:px-4">
                    Email
                  </th>
                  <th className="hidden md:table-cell text-left text-xs md:text-sm font-semibold text-foreground pb-2 md:pb-3 px-3 md:px-4">
                    Join Date
                  </th>
                  <th className="text-left text-xs md:text-sm font-semibold text-foreground pb-2 md:pb-3 px-3 md:px-4">
                    Status
                  </th>
                  <th className="text-left text-xs md:text-sm font-semibold text-foreground pb-2 md:pb-3 px-3 md:px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">
                      {user.name}
                    </td>
                    <td className="hidden sm:table-cell px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="hidden md:table-cell px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                      <span
                        className={`inline-block px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3">
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="text-xs md:text-sm text-primary hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
