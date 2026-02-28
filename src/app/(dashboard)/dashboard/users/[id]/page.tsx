import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { User } from "@/types";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/${userId}`,
  );

  const user: User = await res.json();

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  const [firstName, lastName] = user.name.split(" ");

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
        <Link href="/dashboard/users" className="shrink-0">
          <Button variant="outline" size="icon" className="rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            User Details
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">
            ID: {user.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Info */}
        <div className="col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                    First Name
                  </label>
                  <p className="text-base md:text-lg font-semibold text-foreground mt-1">
                    {firstName}
                  </p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                    Last Name
                  </label>
                  <p className="text-base md:text-lg font-semibold text-foreground mt-1">
                    {lastName}
                  </p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                    Email
                  </label>
                  <p className="text-base md:text-lg font-semibold text-foreground mt-1 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  Current Status
                </p>
                <p
                  className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold ${
                    user.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>

              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  Joined Date
                </p>
                <p className="text-xs md:text-sm font-medium text-foreground">
                  {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base">
                Edit User
              </Button>
              <Button
                variant="outline"
                className="w-full text-destructive hover:bg-destructive/10 text-sm md:text-base"
              >
                Remove User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
