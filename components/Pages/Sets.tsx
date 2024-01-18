"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import frame1 from "@/public/assets/frame1.png";
import frame2 from "@/public/assets/frame2.png";
import frame3 from "@/public/assets/frame3.png";
import frame4 from "@/public/assets/frame4.png";
import flowerIcon from "@/public/assets/flowerIcon.png";
import gridIcon from "@/public/assets/gridIcon.png";

import { sets } from "@/data/data";

function Sets() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentVideoIndex + 1) % sets.length;
      setCurrentVideoIndex(nextIndex);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentVideoIndex]);

  return (
    <section
      id="sets"
      className="h-[80vh] lg:h-[100dvh] bg-trace-ash text-bridal-health relative"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        src={sets[currentVideoIndex].video}
        className="w-full h-full object-cover object-center pointer-events-none outline-0 absolute"
      />
      <div className="flex flex-col w-full h-full justify-between p-4 pb-8 lg:p-8 lg:pb-16 absolute">
        <div className="flex w-full justify-center gap-4 items-center">
          <p className="uppercase text-md tracking-wide">Live</p>
          <Image src={gridIcon} alt="photo_frame" height={20} width={20} />
          <p className="uppercase text-md tracking-wide">Sets</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-end">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="uppercase text-xs lg:text-sm tracking-wide"
                >
                  Location
                </label>
                <p className="uppercase text-sm lg:text-base tracking-wide">
                  {sets[currentVideoIndex].location}
                </p>
              </div>
              <a
                href={sets[currentVideoIndex].url}
                target="_blank"
                className="lg:hidden text-[10px] tracking-wide uppercase inline underline w-[120px]"
              >
                Watch on YouTube
              </a>
            </div>
            <div className="flex flex-col gap-4 relative">
              <p className="hidden lg:flex w-[500px]">
                {sets[currentVideoIndex].description}
              </p>
              <a
                href={sets[currentVideoIndex].url}
                target="_blank"
                className="hidden lg:flex text-[11px] tracking-wide uppercase underline w-[120px]"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            {sets.map((set, index) => (
              <button
                key={index}
                className={`text-[11px] tracking-wide uppercase underline ${
                  currentVideoIndex === index
                    ? "text-bridal-health "
                    : "text-swiss-coffee"
                }`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                {set.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sets;
