"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { HiMiniArrowUpRight } from "react-icons/hi2";

// Dummy articles about rare coffees and reviews
const articles = [
  {
    name: "Uncovering the Hidden Gems: Imani Coffee's Rare Selections Reviewed",
    year: 2025,
    url: "#",
  },
  {
    name: "Why Rarity Matters: A Visit to Imani Coffee",
    year: 2025,
    url: "#",
  },
  {
    name: "Beyond the Score Sheet: The Character of Imani's Coffees",
    year: 2024,
    url: "#",
  },
  {
    name: "A Mindful Cup: Experiencing Uniqueness at Imani Coffee",
    year: 2024,
    url: "#",
  },
  {
    name: "Nature's Precision in Every Brew: Imani Coffee Reviewed",
    year: 2023,
    url: "#",
  },
];

// Dummy distinctions about the coffee shop and its owners
const distinctions = [
  {
    name: "2025 National Coffee House of the Year – Celebrating Community & Craft",
    year: 2025,
    url: "#",
  },
  {
    name: "Imani's Founders Named to '30 Under 30' in Coffee Innovation",
    year: 2024,
    url: "#",
  }
];

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
      background: "#232323", // fade from a lighter dark
    });
  });
  return (
    <a
      ref={award}
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
        <span>Recognition</span>
        <br />
        <span className="ml-8">+ Distinction</span>
      </h3>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
        <video
          ref={video}
          src="/videos/hero-video-compressed.mp4"
          autoPlay
          loop
          playsInline
          muted
          className="w-full h-[200px] lg:w-[590px] lg:h-[330px] object-cover rounded lg:rounded-md outline-0"
        />
        <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 max-w-2xl px-2">
          <div className="mask">
            <h2 ref={headerText1} className="text-2xl lg:text-5xl font-medium tracking-tight mb-2" style={{ fontFamily: 'Gambetta, serif' }}>
              Drawn from Nature&apos;s Precision
            </h2>
          </div>
          <div className="mask">
            <p ref={headerText2} className="text-lg lg:text-2xl font-light tracking-tight mb-2" style={{ fontFamily: 'General Sans, sans-serif' }}>
              We honor the overlooked, celebrate character, and elevate every step from origin to cup. Our journey is guided by mindful sourcing, thoughtful roasting, and a quiet dedication to detail, balance, and integrity.
            </p>
          </div>
          <div className="mask">
            <p className="text-base lg:text-lg font-light text-bridal-health/80" style={{ fontFamily: 'General Sans, sans-serif' }}>
              Redefining value, celebrating uniqueness, and inviting you to taste beyond the numbers.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
        <div className="flex flex-col gap-2 lg:gap-6 w-full lg:w-[50%]">
          <h4 className="text-xl lg:text-5xl">Mentions</h4>
          <ul className="flex flex-col">
            {articles.map((item, index) => (
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
          <h4 className="text-xl lg:text-5xl">Distinctions</h4>
          <ul className="flex flex-col">
            {distinctions.map((item, index) => (
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
