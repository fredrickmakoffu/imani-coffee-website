"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiMiniArrowUpRight } from "react-icons/hi2";


import { events } from "@/data/data";

type EventCardProps = {
  date: string;
  venue: string;
  location: string;
  url: string;
};

function EventCard({ date, venue, location, url }: EventCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center event-card py-4 lg:py-8 border-b-trace-ash border-b-[1px] w-full transition-all duration-300 hover:bg-swiss-coffee hover:px-4 relative"
    >
      <p className="text-sm lg:text-xl uppercase w-2/12">{date}</p>
      <p className="text-sm lg:text-xl uppercase w-5/12">{venue}</p>
      <p className="text-sm lg:text-xl uppercase w-4/12">{location}</p>
      <div className="flex gap-2 items-center">
        <p className="text-sm lg:text-xl uppercase hidden lg:flex">Tickets</p>
        <HiMiniArrowUpRight color={"#0F0F0F"} size={28} />
      </div>
    </a>
  );
}

function Events() {
  const headerText1 = useRef(null);
  const headerText2 = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(headerText1.current, {
      scrollTrigger: {
        trigger: headerText1.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 0.25,
      },
      xPercent: 30,
      yPercent: -30,
    });
    gsap.to(headerText2.current, {
      scrollTrigger: {
        trigger: headerText2.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 0.25,
      },
      xPercent: -30,
      yPercent: 30,
    });
  }, []);

  return (
    <section
      id="events"
      className="px-4 py-16 lg:px-12 overflow-hidden bg-bridal-health"
    >
      <div className="relative">
        <h2
          ref={headerText1}
          className="text-[11dvw] font-semibold absolute uppercase"
        >
          Tours /
        </h2>
        <h2
          ref={headerText2}
          className="text-[11dvw] font-semibold absolute right-0 uppercase"
        >
          Events
        </h2>
      </div>
      <div className="flex flex-col pt-[20vw]">
        <ul>
          {events.map((event, index) => (
            <EventCard
              key={index}
              date={event.date}
              venue={event.venue}
              location={event.location}
              url={event.url}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Events;
