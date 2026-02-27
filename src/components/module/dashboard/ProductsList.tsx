export function ProductsList({ products }: { products: any[] }) {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
          <span className="text-lg">📦</span>
          <div className="flex-1">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">
              ${product.price} • {product.sales} sales
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}