"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function About() {
  const headerRef1 = useRef(null);
  const headerRef2 = useRef(null);
  const headerRef3 = useRef(null);
  const headerRef31 = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(headerRef1.current, {
      scrollTrigger: {
        trigger: headerRef1.current,
        start: "top 100%",
        end: "top 80%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(headerRef2.current, {
      scrollTrigger: {
        trigger: headerRef2.current,
        start: "top 100%",
        end: "top 70%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(headerRef3.current, {
      scrollTrigger: {
        trigger: headerRef3.current,
        start: "top 100%",
        end: "top 60%",
        scrub: true,
      },
      y: "100%",
    });
    gsap.from(headerRef31.current, {
      scrollTrigger: {
        trigger: headerRef31.current,
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
      className="min-h-[100dvh] bg-trace-ash text-bridal-health flex flex-col justify-center px-4 py-32 lg:px-12 lg:py-40 relative"
    >
      <div className="mask">
        <h2 ref={headerRef1} className="text-[8.5dvw] leading-[1] uppercase">
          Concrete
        </h2>
      </div>
      <div className="mask">
        <h2
          ref={headerRef2}
          className="text-[8.5dvw] leading-[1] uppercase ml-[18%]"
        >
          Foundation
        </h2>
      </div>
      <div className="mask ml-[45%] lg:hidden flex">
        <h2 ref={headerRef31} className="text-[8.5dvw] leading-[1] uppercase">
          For Music
        </h2>
      </div>
      <div className="lg:ml-[18%] flex flex-col lg:flex-row gap-8">
        <div className="relative w-full h-60 lg:w-[1100px] lg:h-[300px] mt-4 rounded-lg overflow-hidden">
          <Image
            src="/images/westend-profile.jpg"
            alt="Westend Live"
            fill
            className="object-center object-cover"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="mask hidden lg:flex">
            <h2
              ref={headerRef3}
              className="text-[8.5dvw] leading-[1] uppercase"
            >
              For Music
            </h2>
          </div>
          <div className="flex flex-col gap-8 ml-2 ">
            <p className="text-base w-full lg:w-[70%] bio">
              New Yorker Westend bursted into the tech house scene in 2016,
              bringing in a new era of produers keen on changing the musical
              landscape of house and techno. Since his debut, each year that
              passes is a career-defining one. He makes the most of everything
              that comes his way, showcasing his versatility and passion in
              anything he does.
            </p>

            <Link
              href="#music"
              className="text-[11px] tracking-wide uppercase underline w-auto bio max-w-fit"
            >
              Explore Releases
            </Link>
          </div>
        </div>
      </div>

      <Image
        src="/icons/urchinIcon.png"
        alt="Urchin Icon"
        width={96}
        height={96}
        className="absolute left-[80%] top-36 spin hidden lg:flex"
      />

      <Image
        src="/icons/tubularIcon.png"
        alt="Tubular Icon"
        width={96}
        height={96}
        className="absolute left-[5%] bottom-[27%] spin hidden lg:flex"
      />

      <Image
        src="/icons/flowerSwiss.png"
        alt="flower Icon"
        width={96}
        height={96}
        className="absolute left-[85%] bottom-28 spin hidden lg:flex"
      />
    </section>
  );
}

export default About;
