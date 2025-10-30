import { Button } from "@/components/ui/button";

interface HeroProps {
  onShopNowClick: () => void;
}

export function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative h-96 lg:h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-2xl text-center text-primary-foreground">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4">
            Premium Lifestyle Products
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 opacity-95">
            Discover our curated collection of tech, fitness, and everyday essentials designed for modern living
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={onShopNowClick}
            className="bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
            data-testid="button-shop-now"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
