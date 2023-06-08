import { Suspense } from "react";
import Basket from "./Basket";
import Logo from "./Logo";
import PizzaGridWrapper from "./PizzaGridWrapper";

export default async function Home() {
  return (
    <div className="grid md:grid-cols-[1fr_360px]">
      <div className="overflow-auto h-screen flex flex-col">
        <header className="bg-off-white grid place-items-center py-14">
          <Logo />
        </header>
        <main className="bg-off-white px-10 pb-[67px] grow">
          <Suspense
            fallback={<div className="text-center">Fetching the pizzas...</div>}
          >
            <PizzaGridWrapper />
          </Suspense>
        </main>
      </div>

      <aside className="hidden md:block">
        <Basket />
      </aside>
    </div>
  );
}
