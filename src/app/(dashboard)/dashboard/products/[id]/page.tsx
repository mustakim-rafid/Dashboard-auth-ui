import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/${productId}`,
  );

  const product = await res.json();

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  const revenue = product.price * product.sales;

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
        <Link href="/dashboard/products" className="shrink-0">
          <Button variant="outline" size="icon" className="rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Product Details
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">
            ID: {product.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Info */}
        <div className="col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3">
              <div>
                <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                  Product Name
                </label>
                <p className="text-base md:text-lg font-semibold text-foreground mt-1">
                  {product.name}
                </p>
              </div>

              <div>
                <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                  Category
                </label>
                <p className="text-base md:text-lg font-semibold text-foreground mt-1 capitalize">
                  {product.category}
                </p>
              </div>

              <div>
                <label className="text-xs md:text-sm font-semibold text-muted-foreground">
                  Price
                </label>
                <p className="text-base md:text-lg font-semibold text-primary mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Total Sales
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    {product.sales.toLocaleString()}
                  </p>
                </div>

                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Revenue
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-primary">
                    $
                    {revenue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
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
              <CardTitle className="text-base md:text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base">
                Edit Product
              </Button>
              <Button variant="outline" className="w-full text-sm md:text-base">
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="w-full text-destructive hover:bg-destructive/10 text-sm md:text-base"
              >
                Archive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
