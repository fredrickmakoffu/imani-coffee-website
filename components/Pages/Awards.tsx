import { publications, awards } from "@/data/data";
import { HiMiniArrowUpRight } from "react-icons/hi2";

type AwardCardProps = {
  name: string;
  year: number;
  url: string;
};

function AwardCard({ name, year, url }: AwardCardProps) {
  return (
    <div className="flex w-full py-4 justify-between items-center font-light tracking-wide cursor-pointer border-b-bridal-health border-b-[1px] transition-all duration-500 hover:px-4">
      <div className="flex gap-8">
        <p className="text-xl">{year}</p>
        <p className="text-xl">{name}</p>
      </div>
      <HiMiniArrowUpRight size={24} />
    </div>
  );
}

function Awards() {
  return (
    <section
      id="awards"
      className="bg-trace-ash text-bridal-health pt-[128px] px-12 flex flex-col gap-8"
    >
      <h3 className="text-4xl uppercase">
        <span>Recognitions</span>
        <br />
        <span>+ Awards</span>
      </h3>
      <div className="flex gap-8">
        <video
          src="/assets/westendInterview.mp4"
          autoPlay
          loop
          muted
          className="w-[590px] h-[330px] object-cover rounded-md"
        />
        <h2 className="uppercase text-6xl">
          Making Lasting Impacts In The Industry
        </h2>
      </div>
      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-6 w-[50%]">
          <h4 className="text-5xl">Publications</h4>
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
        <div className="flex flex-col gap-6 w-[50%]">
          <h4 className="text-5xl">Awards</h4>
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
