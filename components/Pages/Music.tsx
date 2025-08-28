"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { songs } from "@/data/data";



type MusicCardProps = {
  name: string;
  year: number;
  url: string;
  img: any;
  description: string;
};

function MusicCard({ name, year, url, img, description }: MusicCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="w-full h-[400px] lg:h-[28vw] bg-[#FBF5EF] rounded-lg flex flex-col justify-between items-center relative shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{ textDecoration: 'none' }}
    >
      <div className="relative flex-1 flex flex-col items-center justify-center w-full">
        <div className="absolute z-[2] transition-all duration-500 album-cover">
          <div className="relative w-[250px] h-[250px] lg:w-[17vw] lg:h-[17vw] rounded-md object-center object-cover overflow-hidden flex items-center justify-center">
            <Image src={img} fill alt="coffee_image" />
          </div>
        </div>
        <div className="relative w-[250px] h-[250px] lg:w-[17vw] lg:h-[17vw] rounded-full object-center object-cover overflow-hidden flex items-center justify-center transition-all duration-500 album-cover-round">
          <Image src={img} fill alt="coffee_image" className="spin" />
        </div>
      </div>
      <div className="flex flex-col justify-end w-full p-4 gap-2 bg-[#FBF5EF]/80 rounded-b-lg">
        <div className="flex justify-between items-center w-full">
          <p className="text-base font-semibold uppercase tracking-tight text-trace-ash">{name}</p>
          <p className="text-xs font-light uppercase text-trace-ash/60">{year}</p>
        </div>
        <p className="text-sm font-light text-trace-ash/80 italic" style={{ fontFamily: 'General Sans, sans-serif' }}>{description}</p>
      </div>
    </a>
  );
}


function Music() {
  const headerText1 = useRef(null);
  const headerText2 = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  // Dummy descriptions for each coffee (match order of songs array)
  const descriptions = [
    "A rare heirloom from the Guji highlands, this coffee is handpicked and sun-dried, revealing floral aromatics and a honeyed finish. Celebrated for its balance and character.",
    "Pink Bourbon from Colombia, grown at high altitude, offers vivid acidity and raspberry notes. A mindful cup for those who taste beyond the numbers.",
    "Kirinyaga's volcanic soil yields blackcurrant and citrus in every sip. Overlooked by many, unforgettable to those who seek depth and distinction."
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=300px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(headerText1.current, { xPercent: xPercent });
    gsap.set(headerText2.current, { xPercent: xPercent });
    xPercent += 0.05 * direction;
    requestAnimationFrame(animation);
  };


  return (
    <section
      id="coffee-discovery"
      className="px-4 py-20 lg:py-32 lg:px-12 bg-bridal-health"
    >
      <div className="slider-container">
        <div ref={slider} className="slider">
          <h2 ref={headerText1} className="text-6xl lg:text-[144px] uppercase ">
            <span className="whitespace-nowrap font-medium tracking-tight">Rare Finds</span>
            <div className="h-[58px] w-[58px] lg:h-[120px] lg:w-[120px] relative flex items-center justify-center mx-1 lg:mx-8 spin">
              <Image src="/icons/circleIcon.png" alt="circle icon" fill />
            </div>
            <span className="whitespace-nowrap font-medium tracking-tight">Distinct Coffees</span>
            <div className="h-[58px] w-[58px] lg:h-[120px] lg:w-[120px] relative flex items-center justify-center mx-1 lg:mx-8 spin">
              <Image src="/icons/circleIcon.png" alt="circle icon" fill />
            </div>
          </h2>
          <h2 ref={headerText2} className="text-6xl lg:text-[144px] uppercase">
            <span className="whitespace-nowrap font-medium tracking-tight">Rare Finds</span>
            <div className="h-[58px] w-[58px] lg:h-[120px] lg:w-[120px] relative flex items-center justify-center mx-1 lg:mx-8 spin">
              <Image src="/icons/circleIcon.png" alt="circle icon" fill />
            </div>
            <span className="whitespace-nowrap font-medium tracking-tight">Distinct Coffees</span>
            <div className="h-[58px] w-[58px] lg:h-[120px] lg:w-[120px] relative flex items-center justify-center mx-1 lg:mx-8 spin">
              <Image src="/icons/circleIcon.png" alt="circle icon" fill />
            </div>
          </h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-32 lg:mt-72 justify-between gap-6">
        {songs.map((song, index) => (
          <MusicCard
            key={index}
            name={song.name}
            year={song.year}
            url={song.url}
            img={song.img}
            description={descriptions[index] || "A rare coffee with a story waiting to be discovered."}
          />
        ))}
      </div>
    </section>
  );
}

export default Music;
