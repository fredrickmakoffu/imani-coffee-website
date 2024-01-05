"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

import { HiMiniArrowUpRight } from "react-icons/hi2";
import flower from "@/public/assets/flower.png";
import eventImg from "@/public/assets/showImage.png";

import { events } from "@/data/data";

type EventCardProps = {
  date: string;
  venue: string;
  location: string;
  url: string;
};

function EventCard({ date, venue, location, url }: EventCardProps) {
  return (
    <li className="event-card py-8 border-b-trace-ash border-b-[1px] w-full transition-all duration-300 hover:bg-swiss-coffee hover:px-4 relative">
      <a href={url} target="_blank" className="flex justify-between">
        <p className="text-xl uppercase">{date}</p>
        <p className="text-xl uppercase">{venue}</p>
        <p className="text-xl uppercase">{location}</p>
        <div className="event-img absolute w-[380px] h-[420px] object-cover object-center ml-[60%] transition-all duration-300 cursor-pointer hidden ">
          <Image src={eventImg} alt={venue} fill className=" rounded-md" />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-xl uppercase">Tickets</p>
          <HiMiniArrowUpRight color={"#0F0F0F"} size={28} />
        </div>
      </a>
    </li>
  );
}

function Events() {
  const headerText1 = useRef(null);
  const headerText2 = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=300px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -114) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(headerText1.current, { xPercent: xPercent });
    gsap.set(headerText2.current, { xPercent: xPercent });
    xPercent += 0.04 * direction;
    requestAnimationFrame(animation);
  };

  return (
    <section id="events" className="py-20 px-12 overflow-hidden">
      <div className="slider-container">
        <div ref={slider} className="slider">
          <h2 ref={headerText1} className="text-[144px] uppercase ">
            <span>Tours</span>
            <Image src={flower} alt="spinning_flower" />
            <span>Events</span>
            <Image src={flower} alt="spinning_flower" />
            <span>Memories</span>
          </h2>
          <h2 ref={headerText2} className="text-[144px] uppercase ">
            <span>Tours</span>
            <Image src={flower} alt="spinning_flower" />
            <span>Events</span>
            <Image src={flower} alt="spinning_flower" />
            <span>Memories</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col mt-60">
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
