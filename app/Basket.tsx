import BasketItem from "@/components/BasketItem";

export default function Basket() {
  return (
    <div className="py-[67px] px-10 flex flex-col gap-8 fixed top-0 bottom-0 right-0 w-[360px] overflow-auto">
      <div className="flex flex-col gap-1">
        <div className="bg-dark h-0.5 rounded"></div>
        <h2 className="uppercase font-semibold text-center">Basket</h2>
        <div className="bg-dark h-0.5 rounded"></div>
      </div>

      <div className="flex flex-col gap-4">
        <BasketItem />
        <BasketItem />
        <BasketItem />
        <BasketItem />
      </div>

      <div className="grid grid-cols-2 bg-red/10 font-semibold text-lg rounded-lg">
        <div className="text-red py-2 text-center">£46.90</div>
        <button className="text-white bg-red py-2 rounded-lg">Order</button>
      </div>
    </div>
  );
}
