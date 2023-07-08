import Logo from "@/components/Logo";
import Image from "next/image";
import OrderNowButton from "./OrderNowButton";

export default function Home() {
  return (
    <div className="px-10 py-14 overflow-hidden min-h-[100dvh]">
      <header className="bg-off-white grid place-items-center mb-10 md:mb-20">
        <Logo />
      </header>

      <div className="max-w-5xl mx-auto">
        <main className="bg-white rounded-3xl p-8 pb-16 relative max-w-sm mx-auto md:min-w-[600px] md:w-full md:max-w-[80%] md:mx-0 md:p-12 md:pr-40">
          <div className="flex flex-col gap-8">
            <h1 className="font-semibold text-4xl md:text-5xl">
              Try the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-[#f68b55]">
                Best Pizza Ever
              </span>{" "}
              Today.
            </h1>
            <p className="leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse at neque tempus, elementum ante sit amet, commodo
              quam.
            </p>
            <OrderNowButton />
          </div>

          <div className="absolute bottom-[-418px] left-0 right-0 grid justify-center md:block md:-top-8 md:-bottom-8 md:left-[calc(100%-9rem)] md:right-auto md:aspect-square">
            <Image
              src="/homeImage.png"
              alt="Delicious Pizza"
              width="392"
              height="392"
              priority
              className="w-[450px] max-w-none md:w-full"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
