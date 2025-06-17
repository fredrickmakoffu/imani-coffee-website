import { Hero, About, Music, Events, Awards, Shop } from "@/components";

export default async function Home() {
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
