import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  isAdding: boolean;
}

export function ProductCard({ product, onAddToCart, isAdding }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Card className="group overflow-hidden hover-elevate transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-product-${product.id}`}
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-xl truncate" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold tabular-nums" data-testid={`text-product-price-${product.id}`}>
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <Button
            size="default"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="gap-2"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
