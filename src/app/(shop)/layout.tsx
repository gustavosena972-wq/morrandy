import { CartProvider } from "@/components/cart-provider";
import { StoreFooter } from "@/components/store/footer";
import { StoreHeader } from "@/components/store/header";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="grid-glow relative flex min-h-screen flex-col">
        <StoreHeader />
        <main className="flex-1">{children}</main>
        <StoreFooter />
      </div>
    </CartProvider>
  );
}
