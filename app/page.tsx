import Logo from "@/components/Logo";
import Image from "next/image";
import OrderNowButton from "./OrderNowButton";

export default function Home() {
  return (
    <div className="min-h-[100dvh] overflow-hidden px-10 py-14">
      <header className="mb-10 grid place-items-center bg-off-white md:mb-20">
        <Logo />
      </header>

      <div className="mx-auto max-w-5xl">
        <main className="relative mx-auto max-w-sm rounded-3xl bg-white p-8 pb-16 md:mx-0 md:w-full md:min-w-[600px] md:max-w-[80%] md:p-12 md:pr-40">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-semibold md:text-5xl">
              Try the{" "}
              <span className="bg-gradient-to-r from-red to-[#f68b55] bg-clip-text text-transparent">
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

          <div className="absolute bottom-[-418px] left-0 right-0 grid justify-center md:-bottom-8 md:-top-8 md:left-[calc(100%-9rem)] md:right-auto md:block md:aspect-square">
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
