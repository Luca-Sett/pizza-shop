export default function Logo() {
  return (
    <div className="flex flex-col w-max">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
        <div className="bg-dark h-0.5 rounded"></div>
        <h2 className="uppercase font-semibold text-sm sm:text-base">
          Welcome To
        </h2>
        <div className="bg-dark h-0.5 rounded"></div>
      </div>
      <h1 className="text-center font-header text-4xl sm:text-5xl">
        Luca&rsquo;s Pizzeria
      </h1>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
        <div className="bg-dark h-0.5 rounded"></div>
        <h2 className="uppercase font-semibold text-sm sm:text-base">
          The Best Pizza Ever
        </h2>
        <div className="bg-dark h-0.5 rounded"></div>
      </div>
    </div>
  );
}
