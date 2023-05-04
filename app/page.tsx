import Basket from "./Basket";
import Header from "./Header";
import PizzaGrid from "./PizzaGrid";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr_360px] min-h-screen">
      <Header />
      <PizzaGrid />
      <Basket />
    </div>
  );
}
