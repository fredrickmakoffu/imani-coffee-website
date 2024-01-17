"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".name", { opacity: 0, scale: 0.8 });
    tl.from(".description", { y: 100, stagger: 0.2, ease: "power3" });
  }, []);

  return (
    <section id="hero" className="bg-trace-ash">
      <video
        src="/assets/set1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover pointer-events-none outline-0"
      />
      <div className="h-[100dvh] absolute top-0 w-full transition-all duration-500">
        <div className="h-full flex flex-col items-center justify-center gap-4 lg:gap-6">
          <div className="mask">
            <h1 className="text-bridal-health uppercase font-bold name leading-[80%]">
              Westend
            </h1>
          </div>
          <div className="flex gap-8">
            <div className="mask">
              <p className="text-sm lg:text-base text-bridal-health uppercase tracking-wider description">
                DJ + Music Producer
              </p>
            </div>
            <div className="mask hidden lg:flex">
              <p className="lg:text-base text-bridal-health uppercase tracking-wider description">
                2016 - Present
              </p>
            </div>
            <div className="mask hidden lg:flex">
              <p className="lg:text-base text-bridal-health uppercase tracking-wider description">
                New York, New York
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full p-4 lg:px-12 lg:py-8 absolute bottom-0">
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
      </div>
    </section>
  );
}

export default Hero;
