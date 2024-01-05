"use client";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import circleIcon from "@/public/assets/circleIconWhite.png";
import aboutImg from "@/public/assets/westendMenu.jpg";
import urchinIcon from "@/public/assets/urchinIcon.png";
import flowerIcon from "@/public/assets/flowerSwiss.png";
import tubularIcon from "@/public/assets/tubularIcon.png";

function About() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".h21", {
      scrollTrigger: {
        trigger: ".h21",
        start: "top 100%",
        end: "top 80%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(".h22", {
      scrollTrigger: {
        trigger: ".h22",
        start: "top 100%",
        end: "top 70%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(".h23", {
      scrollTrigger: {
        trigger: ".h23",
        start: "top 100%",
        end: "top 60%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(".bio", {
      scrollTrigger: {
        trigger: ".bio",
        start: "top 80%",
        end: "top 70%",
      },
      opacity: 0,
      duration: 1,
      stagger: 0.5,
    });
  });

  return (
    <section
      id="about"
      className="min-h-[100dvh] bg-trace-ash text-bridal-health flex flex-col justify-center px-12 py-40 relative"
    >
      <div className="mask">
        <h2 className="text-[8.5dvw] leading-[1] uppercase h21">Concrete</h2>
      </div>
      <div className="mask">
        <h2 className="text-[8.5dvw] leading-[1] uppercase ml-[18%] h22">
          Foundati<span className="hidden">o</span>
          <span>
            <Image
              src={circleIcon}
              height={96}
              width={96}
              priority
              arria-hidden="true"
              alt="O icon"
              className="inline -translate-y-3 h22"
            />
          </span>
          n
        </h2>
      </div>
      <div className="ml-[18%] flex gap-8">
        <div className="w-[1100px] h-[300px] mt-4 overflow-hidden flex justify-center items-center">
          <Image src={aboutImg} height={300} width={1100} alt="Tyler Morris" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="mask">
            <h2 className="text-[8.5dvw] leading-[1] uppercase h23">
              For Music
            </h2>
          </div>
          <div className="flex flex-col gap-8 ml-2 ">
            <p className="text-base w-[70%] bio">
              Lorem ipsum dolor sit amet consectetur. Mauris arcu magna
              suspendisse est interdum sed sit vel mi. Nulla tempor scelerisque
              vel at tristique senectus sit. Lectus condimentum pellentesque
              elementum odio sit rhoncus ut. Aliquet cras in nulla et integer
              condimentum malesuada.
            </p>
            <Link
              href="#music"
              className="text-[11px] tracking-wide uppercase underline w-auto bio"
            >
              Explore Releases
            </Link>
          </div>
        </div>
      </div>

      <Image
        src={urchinIcon}
        alt="Urchin Icon"
        width={96}
        height={96}
        className="absolute left-[80%] top-36 spin"
      />

      <Image
        src={tubularIcon}
        alt="Tubular Icon"
        width={96}
        height={96}
        className="absolute left-[5%] bottom-[27%] spin"
      />

      <Image
        src={flowerIcon}
        alt="flower Icon"
        width={96}
        height={96}
        className="absolute left-[85%] bottom-28 spin"
      />
    </section>
  );
}

export default About;
