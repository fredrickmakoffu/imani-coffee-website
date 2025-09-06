import { HiMiniArrowUpRight } from "react-icons/hi2";
import Link from "next/link";
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
    <div className="flex flex-col p-4 bg-[#FBF5EF] w-full lg:w-[430px] lg:h-[350px] gap-6 cursor-pointer transition-all duration-300 hover:scale-105 rounded-md">
      <label
        htmlFor="item_type"
        className="hidden lg:flex text-sm uppercase border-b-trace-ash border-b-[1px] pb-2 tracking-wider"
      >
        {product.type === 'coffee' ? 'Coffee' : product.type}
      </label>
      <div className="flex flex-col h-full justify-between gap-8 lg:gap-0">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="item_name"
            className="text-lg uppercase border-b-trace-ash border-b-[1px] pb-2 lg:pb-0 lg:border-b-0 tracking-tight"
          >
            {product.name}
          </label>
          <p className="text-sm font-light">{product.description}</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="font-medium text-base">${product.price}.00</p>
          <HiMiniArrowUpRight color={"#0F0F0F"} size={24} />
        </div>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <section
      id="shop"
      className="px-4 py-16 lg:py-[128px] lg:px-12 bg-bridal-health mb-[100dvh]"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-16">
        <h2 className="text-xl lg:text-4xl uppercase font-medium tracking-tight mb-4 lg:mb-0">
          Rare, Distinct, Coffee
        </h2>
        <Link 
          href="/shop"
          className="inline-flex items-center gap-2 text-trace-ash hover:text-cod-gray transition-colors duration-300 text-sm lg:text-base uppercase tracking-wide font-medium"
        >
          Browse Full Store
          <HiMiniArrowUpRight size={20} />
        </Link>
      </div>
      <div className="flex gap-8 flex-wrap">
        {products.slice(0, 3).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8 lg:mt-16">
        <Link 
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-trace-ash text-bridal-health hover:bg-cod-gray transition-colors duration-300 rounded-md text-sm lg:text-base uppercase tracking-wide font-medium"
        >
          Shop All Products
          <HiMiniArrowUpRight size={20} />
        </Link>
      </div>
    </section>
  );
}

export default Shop;