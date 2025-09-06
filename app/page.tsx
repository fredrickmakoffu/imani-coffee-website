import Hero from "@/components/Pages/Hero";
import About from "@/components/Pages/About";
import Music from "@/components/Pages/Music";
import Events from "@/components/Pages/Events";
import Awards from "@/components/Pages/Awards";
import Shop from "@/components/Pages/Shop";

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
