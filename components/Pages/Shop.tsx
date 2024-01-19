import { HiMiniArrowUpRight } from "react-icons/hi2";

import { products } from "@/data/data";

type ProductCardProps = {
  product: {
    type: string;
    name: string;
    description: string;
    price: number;
    url: string;
  };
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <a
      href={product.url}
      target="_blank"
      className="flex flex-col p-4 bg-[#FBF5EF] w-full lg:w-[430px] lg:h-[350px] gap-6 cursor-pointer transition-all duration-300 hover:scale-105 rounded-md"
    >
      <label
        htmlFor="item_type"
        className="hidden lg:flex text-sm uppercase border-b-trace-ash border-b-[1px] pb-2"
      >
        {product.type}
      </label>
      <div className="flex flex-col h-full justify-between gap-8 lg:gap-0">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="item_name"
            className="text-lg uppercase border-b-trace-ash border-b-[1px] pb-2 lg:pb-0 lg:border-b-0 "
          >
            {product.name}
          </label>
          <p className="text-sm">{product.description}</p>
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
      className="px-4 py-16 lg:py-[128px] lg:px-12 bg-bridal-health mb-[100dvh]"
    >
      <h2 className="text-xl lg:text-4xl uppercase">Shop Westend</h2>
      <div className="flex gap-8 flex-wrap mt-8 lg:mt-16">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
