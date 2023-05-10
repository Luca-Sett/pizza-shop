import MenuItem from "@/components/MenuItem";

export default function PizzaGrid() {
  return (
    <main className="row-start-2 bg-off-white px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {new Array(8).fill(0).map((_, i) => (
            <MenuItem i={i} key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
