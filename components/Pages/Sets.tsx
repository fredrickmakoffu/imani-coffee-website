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
      className="h-[80dvh] lg:h-[100dvh] bg-trace-ash text-bridal-health relative"
    >
      <div className="h-full w-full flex flex-col justify-between p-8 absolute">
        <div className="flex w-full justify-center gap-4 items-center">
          <p className="uppercase text-md tracking-wide">Live</p>
          <Image src={gridIcon} alt="photo_frame" height={20} width={20} />
          <p className="uppercase text-md tracking-wide">Sets</p>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-12">
            <div>
              <label
                htmlFor="location"
                className="uppercase text-sm tracking-wide"
              >
                Location
              </label>
              <p className="uppercase tracking-wide">
                {sets[currentVideoIndex].location}
              </p>
            </div>
            <div className="flex gap-4">
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
          <div className="flex flex-col gap-12">
            <p className="w-[35%]">{sets[currentVideoIndex].description}</p>
            
          </div>

        </div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        src={sets[currentVideoIndex].video}
        className="w-full h-full object-cover object-center pointer-events-none outline-0"
      />
    </section>
  );
}

export default Sets;
