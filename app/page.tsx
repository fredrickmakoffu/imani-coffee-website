import { Hero, About, Music, Sets, Events, Awards, Shop } from "@/components";

import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export  default async function Home() {


  return (
    <main className="scroll-smooth">
      <Hero />
      <About />
      <Music />
      <Sets />
      {/* <Events /> */}
      <Awards />
      <Shop />
    </main>
  );
}
