import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight">
              Vibe Commerce
            </h1>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={onCartClick}
            className="relative"
            data-testid="button-cart"
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-xs font-semibold"
                data-testid="badge-cart-count"
              >
                <span className="sr-only">items in cart</span>
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
