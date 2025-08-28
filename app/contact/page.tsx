"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Page() {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      yPercent: 100,
      ease: "power3",
      duration: 1.2,
      opacity: 0,
    });
  });

  return (
    <section
      id="contact"
      className="px-12 py-24 bg-bridal-health text-trace-ash"
    >
      <div className="mask">
        <h1 ref={headerRef} className="super-size font-medium">
          Contact
        </h1>
      </div>
      <div className="flex flex-col gap-8 mt-20 lg:mt-28 ml-20">
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">General Inquiries:</p>
          <a className="text-base max-w-fit" href="mailto: hello@imanicoffee.com">
            hello@imanicoffee.com
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Phone:</p>
          <a className="text-base max-w-fit" href="tel:1234567890">
            0100 000 000
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Visit Us:</p>
          <span className="text-base max-w-fit">
            123 Origin Lane, Nairobi, Kenya
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Hours:</p>
          <span className="text-base max-w-fit">
            Mon–Sat: 7am – 6pm<br />Sun: 8am – 4pm
          </span>
        </div>
      </div>
    </section>
  );
}

export default Page;
