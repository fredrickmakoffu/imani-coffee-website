import { Hero, About, Music, Sets, Events, Awards, Shop } from "@/components";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <About />
      <Music />
      {/* <Sets /> */}
      {/* <Events /> */}
      <Awards />
      <Shop />
    </main>
  );
}
