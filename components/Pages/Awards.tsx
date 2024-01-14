"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { HiMiniArrowUpRight } from "react-icons/hi2";

import { publications, awards } from "@/data/data";

type AwardCardProps = {
  name: string;
  year: number;
  url: string;
};

function AwardCard({ name, year, url }: AwardCardProps) {
  const award = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(award.current, {
      scrollTrigger: {
        trigger: award.current,
        start: "top 95%",
        end: "top 70%",
        scrub: 0.25,
      },
      background: "white",
    });
  });
  return (
    <a
      href={url}
      target="_blank"
      className="flex w-full py-4 justify-between items-center font-light tracking-wide cursor-pointer border-b-bridal-health border-b-[1px] transition-all duration-500 hover:px-4"
    >
      <div className="flex gap-8 w-[80%] lg:w-full">
        <p className="text-base lg:text-xl">{year}</p>
        <p className="text-base lg:text-xl">{name}</p>
      </div>
      <HiMiniArrowUpRight color={"#FFFBF6"} size={24} />
    </a>
  );
}

function Awards() {
  const headerText1 = useRef(null);
  const headerText2 = useRef(null);
  const video = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(video.current, {
      scrollTrigger: {
        trigger: headerText1.current,
        start: "top 95%",
        end: "top 70%",
        scrub: 0.25,
      },
      scale: ".9",
    });
    gsap.from(headerText1.current, {
      scrollTrigger: {
        trigger: headerText1.current,
        start: "top 95%",
        end: "top 70%",
        scrub: 0.25,
      },
      y: "100%",
    });
    gsap.from(headerText2.current, {
      scrollTrigger: {
        trigger: headerText2.current,
        start: "top 90%",
        end: "top 70%",
        scrub: 0.25,
      },
      y: "100%",
    });
  });

  return (
    <section
      id="awards"
      className="bg-trace-ash text-bridal-health px-4 py-16 lg:py-[128px] lg:px-12 flex flex-col gap-8"
    >
      <h3 className="text-xl lg:text-4xl uppercase">
        <span>Recognitions</span>
        <br />
        <span>+ Awards</span>
      </h3>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <video
          ref={video}
          src="/assets/westendInterview.mp4"
          autoPlay
          loop
          muted
          className="w-full h-[200px] lg:w-[590px] lg:h-[330px] object-cover rounded lg:rounded-md"
        />
        <div className="flex flex-col">
          <div className="mask">
            <h2 ref={headerText1} className="uppercase text-3xl lg:text-6xl">
              Making Lasting Impacts
            </h2>
          </div>
          <div className="mask">
            <h2 ref={headerText2} className="uppercase text-3xl lg:text-6xl">
              In The Industry
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col gap-2 lg:gap-6 w-full lg:w-[50%]">
          <h4 className="text-xl lg:text-5xl">Publications</h4>
          <ul className="flex flex-col">
            {publications.map((item, index) => (
              <AwardCard
                key={index}
                name={item.name}
                year={item.year}
                url={item.url}
              />
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 lg:gap-6 w-full lg:w-[50%]">
          <h4 className="text-xl lg:text-5xl">Awards</h4>
          <ul className="flex flex-col">
            {awards.map((item, index) => (
              <AwardCard
                key={index}
                name={item.name}
                year={item.year}
                url={item.url}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Awards;
