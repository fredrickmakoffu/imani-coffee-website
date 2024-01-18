"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function page() {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      yPercent: 100,
      ease: "power3",
      duration: 1.3,
      opacity: 0,
    });
  });

  return (
    <section id="imprint" className="px-12 py-24 bg-bridal-health">
      <div className="mask">
        <h1 ref={headerRef} className="super-size font-medium">
          Imprint
        </h1>
      </div>
      <div className="flex flex-col gap-8 mt-28 ml-20">
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Managing Director:</p>
          <a className="text-base" href="mailto: westend@ayita.com">
            Michael Carella
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Contact:</p>
          <a className="text-base" href="tel:4253274614">
            Tel: (424) 237-4614
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">
            Mail For Business Inquiries:
          </p>
          <a className="text-base" href="mailto: westend@ayita.com">
            westend@ayita.com
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">
            Mail For Booking And Events:
          </p>
          <a className="text-base" href="mailto: lhandelsman@teamwass.com">
            lhandelsman@teamwass.com
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">Inbox For Demos:</p>
          <a
            className="text-base"
            href="https://tstack.app/traceamounts"
            target="_blank"
          >
            https://tstack.app/traceamounts
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm font-medium">
            Design And Development:
          </p>
          <a
            className="text-base"
            href="https://www.spinnin.studio/"
            target="_blank"
          >
            SPINNIN Studio
          </a>
        </div>
      </div>
    </section>
  );
}

export default page;
