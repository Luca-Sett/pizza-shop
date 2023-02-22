import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/20/solid";
import PopInButtonLink from "@/components/PopInButtonLink";
import Title from "./Title";

export default function Home() {
  return (
    <main className="h-[100svh] bg-[radial-gradient(at_center,#000000b0,#000000f0),url(/pizza-hero.jpg)] bg-cover grid place-items-center text-center text-white tracking-wider">
      <div>
        <Title />

        <div className="grid gap-3 mt-8 md:grid-cols-2">
          <PopInButtonLink to="/our-story" delay={0.4}>
            Our Story
            <BuildingStorefrontIcon className="inline-block h-5 w-5" />
          </PopInButtonLink>

          <PopInButtonLink primary to="/order" delay={0.6}>
            Order Now <ShoppingBagIcon className="inline-block h-5 w-5" />
          </PopInButtonLink>
        </div>
      </div>
    </main>
  );
}
