"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".name", { opacity: 0, scale: 0.8 });
    tl.from(".description", { y: 100, stagger: 0.2, ease: "power3" });
  }, []);

  return (
    <section id="hero" className="h-[100dvh] w-full">
      <video
        src="/assets/HeroBackground.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col absolute w-full h-full top-0 items-center justify-center gap-6">
        <div className="mask">
          <h1 className="text-bridal-health uppercase text-8xl font-bold name">
            Westend
          </h1>
        </div>
        <div className="flex gap-8">
          <div className="mask">
            <p className="text-bridal-health uppercase tracking-wider description">
              DJ + Music Producer
            </p>
          </div>
          <div className="mask">
            <p className="text-bridal-health uppercase tracking-wider description">
              2016 - Present
            </p>
          </div>
          <div className="mask">
            <p className="text-bridal-health uppercase tracking-wider description">
              New York, New York
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full px-12 py-8 absolute bottom-0">
        <p className="text-bridal-health uppercase font-semibold tracking-wider">
          Scroll
        </p>
        <p className="text-bridal-health uppercase font-semibold tracking-wider">
          To
        </p>
        <p className="text-bridal-health uppercase font-semibold tracking-wider">
          Discover
        </p>
      </div>
    </section>
  );
}

export default Hero;
