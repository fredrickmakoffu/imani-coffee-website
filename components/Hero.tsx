import React from "react";

function Hero() {
  return (
    <section id="hero" className="h-[100dvh] w-full">
      <video
        src="/assets/westendhero.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col absolute w-full h-full top-0 items-center justify-center gap-8">
        <h1 className="text-bridal-health uppercase text-8xl font-bold">
          Westend
        </h1>
        <div className="flex gap-8">
          <p className="text-bridal-health uppercase tracking-wider">
            DJ + Music Producer
          </p>
          <p className="text-bridal-health uppercase tracking-wider">
            2016-Present
          </p>
          <p className="text-bridal-health uppercase tracking-wider">
            New York, New York
          </p>
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
