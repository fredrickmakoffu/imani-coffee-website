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
      <div className="h-full flex flex-col justify-between w-full p-4 lg:p-12 absolute">
        <div className="absolute left-[50%] translate-x-[-50%] flex gap-4 items-center">
          <p className="uppercase text-md tracking-wide">Live</p>
          <Image src={gridIcon} alt="photo_frame" height={20} width={20} />
          <p className="uppercase text-md tracking-wide">Sets</p>
        </div>

        <div className="flex justify-between items-start">
          <Image src={frame1} alt="photo_frame" height={48} width={48} />
          <Image src={frame2} alt="photo_frame" height={48} width={48} />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between px-12 ">
            <div className="flex flex-col gap-8">
              <p className="hidden lg:flex w-[400px]">
                {sets[currentVideoIndex].description}
              </p>
              <a
                href={sets[currentVideoIndex].url}
                target="_blank"
                className="text-[11px] tracking-wide uppercase underline"
              >
                Watch on Youtube
              </a>
            </div>
            <div className="flex flex-col gap-3 w-[20%] items-end">
              <button
                className={`text-[11px] tracking-wide uppercase underline ${
                  currentVideoIndex === 0
                    ? "text-bridal-health "
                    : "text-swiss-coffee"
                }`}
                onClick={() => setCurrentVideoIndex(0)}
              >
                Hard Rock
              </button>
              <button
                className={`text-[11px] tracking-wide uppercase underline ${
                  currentVideoIndex === 1
                    ? "text-bridal-health "
                    : "text-swiss-coffee"
                }`}
                onClick={() => setCurrentVideoIndex(1)}
              >
                Outside Lands
              </button>
              <button
                className={`text-[11px] tracking-wide uppercase underline ${
                  currentVideoIndex === 2
                    ? "text-bridal-health "
                    : "text-swiss-coffee"
                }`}
                onClick={() => setCurrentVideoIndex(2)}
              >
                Rayo Verde
              </button>
              <button
                className={`text-[11px] tracking-wide uppercase underline ${
                  currentVideoIndex === 3
                    ? "text-bridal-health "
                    : "text-swiss-coffee"
                }`}
                onClick={() => setCurrentVideoIndex(3)}
              >
                Superior Ingredients
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <Image src={frame4} alt="photo_frame" height={48} width={48} />
            <Image src={frame3} alt="photo_frame" height={48} width={48} />
          </div>
        </div>

        <div className="absolute left-[50%] translate-x-[-50%] bottom-12 flex gap-4 items-center">
          <p className="uppercase text-md tracking-wide">
            {sets[currentVideoIndex].name}
          </p>
          <Image
            src={flowerIcon}
            alt="photo_frame"
            className=""
            height={20}
            width={20}
          />
          <p className="uppercase text-md tracking-wide">
            {sets[currentVideoIndex].location}
          </p>
        </div>
      </div>
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover object-center pointer-events-none"
      >
        <source src={sets[currentVideoIndex].video} type="video/mp4" />
      </video>
    </section>
  );
}

export default Sets;
