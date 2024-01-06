"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import circleIcon from "@/public/assets/circleIcon.png";

import { songs } from "@/data/data";

type MusicCardProps = {
  name: string;
  year: number;
  url: string;
  img: any;
};

function MusicCard({ name, year, url, img }: MusicCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="w-full h-[520px] bg-[#FBF5EF] rounded-md flex justify-center items-center relative"
    >
      <div className="relative">
        <div className="absolute z-[2] w-[300px] h-[300px] rounded-md object-center object-cover overflow-hidden flex items-center justify-center transition-all duration-500 album-cover">
          <Image src={img} height={300} width={300} alt="song_name" />
        </div>
        <div className="w-[300px] h-[300px] rounded-full object-center object-cover overflow-hidden flex items-center justify-center transition-all duration-500 album-cover-round">
          <Image
            src={img}
            height={300}
            width={300}
            alt="song_name"
            className="spin"
          />
        </div>
      </div>
      <div className="flex justify-between p-4 w-full absolute bottom-0">
        <p className="text-sm uppercase">{name}</p>
        <p className="text-sm uppercase">{year}</p>
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
    if (xPercent <= -114) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(headerText1.current, { xPercent: xPercent });
    gsap.set(headerText2.current, { xPercent: xPercent });
    xPercent += 0.04 * direction;
    requestAnimationFrame(animation);
  };

  return (
    <section id="music" className="py-20 px-12 bg-bridal-health">
      <div className="slider-container">
        <div ref={slider} className="slider">
          <h2 ref={headerText1} className="text-[144px] uppercase">
            <span className="whitespace-nowrap">New Music</span>
            <Image src={circleIcon} alt="circle icon" />
            <span className="whitespace-nowrap">New Releases</span>
            <Image src={circleIcon} alt="circle icon" />
          </h2>
          <h2 ref={headerText2} className="text-[144px] uppercase">
            <span className="whitespace-nowrap">New Music</span>
            <Image src={circleIcon} alt="circle icon" />
            <span className="whitespace-nowrap">New Releases</span>
            <Image src={circleIcon} alt="circle icon" />
          </h2>
        </div>
      </div>
      <div className="flex mt-80 justify-between gap-8">
        {songs.map((song, index) => (
          <MusicCard
            key={index}
            name={song.name}
            year={song.year}
            url={song.url}
            img={song.img}
          />
        ))}
      </div>
    </section>
  );
}

export default Music;
