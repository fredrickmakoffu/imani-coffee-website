"use client";

import React from "react";
import { useState } from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";

function ProductCard({ item }: any) {
  return (
    <a
      href="https://www.itsthewestend.com/"
      className="flex flex-col p-4 bg-[#FBF5EF] w-[430px] h-[350px] gap-6 cursor-pointer transition-all duration-300 hover:scale-105 rounded-md"
    >
      <label
        htmlFor="item_type"
        className="text-sm uppercase border-b-trace-ash border-b-[1px] pb-2"
      >
        Project File
      </label>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-4">
          <label htmlFor="item_name" className="text-lg uppercase ">
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
  // const [category, setCategory] = useState(second)

  return (
    <section id="shop" className="py-[128px] px-12 min-h-[100dvh] bg-bridal-health mb-[100dvh]">
      <h2 className="text-4xl uppercase">Shop Westend</h2>
      <div className="mt-24 w-full flex justify-between gap-20">
        <div className="flex flex-col gap-36 items-start">
          <button className="text-5xl uppercase whitespace-nowrap">
            Merchendise <span className="text-xl">04</span>
          </button>
          <button className="text-5xl uppercase whitespace-nowrap">
            Project files <span className="text-xl">04</span>
          </button>
          <button className="text-5xl uppercase whitespace-nowrap">
            Other <span className="text-xl">04</span>
          </button>
        </div>
        <div className="flex gap-8 flex-wrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

export default Shop;
