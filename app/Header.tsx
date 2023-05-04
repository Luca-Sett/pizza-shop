export default function Header() {
  return (
    <header className="bg-off-white grid place-items-center py-10">
      <div className="flex flex-col w-max">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="bg-dark h-0.5 rounded"></div>
          <h2 className="uppercase font-semibold">Welcome To</h2>
          <div className="bg-dark h-0.5 rounded"></div>
        </div>
        <h1 className="text-center font-header text-5xl">Luca's Pizzeria</h1>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="bg-dark h-0.5 rounded"></div>
          <h2 className="uppercase font-semibold">The Best Pizza Ever</h2>
          <div className="bg-dark h-0.5 rounded"></div>
        </div>
      </div>
    </header>
  );
}
