import { HiMiniArrowUpRight } from "react-icons/hi2";

function ProductCard({ item }: any) {
  return (
    <a
      href="https://www.itsthewestend.com/"
      className="flex flex-col p-4 bg-[#FBF5EF] w-full lg:w-[430px] lg:h-[350px] gap-6 cursor-pointer transition-all duration-300 hover:scale-105 rounded-md"
    >
      <label
        htmlFor="item_type"
        className="hidden lg:flex text-sm uppercase border-b-trace-ash border-b-[1px] pb-2"
      >
        Project File
      </label>
      <div className="flex flex-col h-full justify-between gap-8 lg:gap-0">
        <div className="flex flex-col gap-4">
          <label htmlFor="item_name" className="text-lg uppercase border-b-trace-ash border-b-[1px] pb-2 lg:pb-0 lg:border-b-0 ">
            Tech House Project
          </label>
          <p className="text-sm">
            Includes the Ableton project file and samples stemming from a
            one-hour track production session. This composition incorporates
            vocals from Splice, along with elements such as drums, bass, synths,
            automation, FX techniques, and a well-crafted track arrangement.
          </p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p>$15.00</p>
          <HiMiniArrowUpRight color={"#0F0F0F"} size={24} />
        </div>
      </div>
    </a>
  );
}

function Shop() {
  return (
    <section
      id="shop"
      className="px-4 py-16 lg:py-[128px] lg:px-12 min-h-[100dvh] bg-bridal-health mb-[100dvh]"
    >
      <h2 className="text-xl lg:text-4xl uppercase">Shop Westend</h2>
      <div className="flex gap-8 flex-wrap mt-8 lg:mt-16">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}

export default Shop;
