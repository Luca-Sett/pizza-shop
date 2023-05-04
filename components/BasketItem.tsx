export default function BasketItem() {
  return (
    <div className="bg-off-white rounded-lg p-4 flex flex-col gap-4">
      <h3 className="font-semibold">Margherita</h3>

      <div className="flex flex-col gap-2 font-medium text-sm">
        <div className="flex justify-between">
          <span>Size</span>

          <div className="flex">
            <div className="px-2 py-[3px] rounded">10&rdquo;</div>
            <div className="px-2 py-[3px] bg-black/10 rounded">12&rdquo;</div>
            <div className="px-2 py-[3px] rounded">14&rdquo;</div>
          </div>
        </div>

        <div className="flex justify-between">
          <span>Quantity</span>

          <div className="flex gap-1">
            <div className="px-2 py-[3px] bg-black/10 rounded">-</div>
            <div className="px-2 py-[3px] rounded">2</div>
            <div className="px-2 py-[3px] bg-black/10 rounded">+</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 text-sm font-semibold">
          <button className="px-2 py-0.5 uppercase rounded bg-red-bg text-red-fg">
            Remove
          </button>
          <button className="px-2 py-0.5 uppercase bg-black/10 rounded">
            Edit
          </button>
        </div>

        <div className="font-semibold">£13.60</div>
      </div>
    </div>
  );
}
