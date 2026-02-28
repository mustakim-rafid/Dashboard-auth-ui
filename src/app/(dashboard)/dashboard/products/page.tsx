import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/types";

export default async function ProductsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`,
  );

  const products: Product[] = await res.json();

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Products
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 md:px-6 text-sm md:text-base whitespace-nowrap">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/dashboard/products/${product.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 truncate capitalize">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3 mt-4 md:mt-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Price
                    </span>
                    <span className="text-base md:text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 md:pt-3 border-t border-border">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Sales
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      {product.sales.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
