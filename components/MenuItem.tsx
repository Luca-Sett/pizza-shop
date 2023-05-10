export default function MenuItem({ i }: { i: number }) {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col">
      <img
        src="/margherita.webp"
        alt="margherita"
        width="320"
        height="221"
        className="rounded-lg mb-3"
      />

      <div className="flex flex-col justify-between h-full">
        <div className="flex gap-3 mb-3">
          <h3 className="font-semibold w-full">
            {i % 2 === 0 ? "Vegetarian Hot" : "Margherita"}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="font-normal text-xs uppercase">From</span>
            <span className="font-medium">£5.50</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-green-bg text-green-fg">
            Vegetarian
          </span>
          <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-red-bg text-red-fg">
            Hot
          </span>
        </div>
      </div>
    </div>
  );
}
