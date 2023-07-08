import Logo from "@/components/Logo";
import OrderAgainButton from "./OrderAgainButton";

export default function OrderComplete() {
  return (
    <>
      <header className="bg-off-white grid place-items-center py-14 px-10">
        <Logo />
      </header>
      <main>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Thank you for Placing Your Order!
        </h1>
        <p className="text-center mb-12">It will be ready shortly 😊</p>

        <div className="text-center">
          <OrderAgainButton />
        </div>
      </main>
    </>
  );
}
