import { CartProvider } from "@/components/cart-provider";
import { StoreFooter } from "@/components/store/footer";
import { StoreHeader } from "@/components/store/header";
import { InteractiveBackground } from "@/components/store/interactive-background";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="relative flex min-h-screen flex-col">
        <InteractiveBackground />
        <StoreHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <StoreFooter />
      </div>
    </CartProvider>
  );
}
