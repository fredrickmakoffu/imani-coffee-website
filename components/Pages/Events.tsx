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
    <li className="py-8 border-b-trace-ash border-b-[1px] w-full transition-all duration-300 hover:bg-swiss-coffee hover:px-4">
      <a href={url} target="_blank" className="flex justify-between">
        <p className="text-xl uppercase">{date}</p>
        <p className="text-xl uppercase">{venue}</p>
        <p className="text-xl uppercase">{location}</p>
        <div className="flex gap-2 items-center">
          <p className="text-xl uppercase">Tickets</p>
          <HiMiniArrowUpRight color={"#0F0F0F"} size={28} />
        </div>
      </a>
    </li>
  );
}

function Events() {
  return (
    <section id="events" className="py-[128px] px-12 min-h[100dvh]">
      <h2 className="text-[144px] uppercase">Events</h2>
      <div className="flex flex-col mt-12">
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
