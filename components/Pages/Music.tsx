import Image from "next/image";
import circleIcon from "@/public/assets/circleIcon.png";
import dirtyBlonde from "@/public/assets/dirtyBlonde.png";

import { songs } from "@/data/data";

type MusicCardProps = {
  name: string;
  year: number;
  url: string;
};

function MusicCard({ name, year, url }: MusicCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="w-full h-[580px] bg-[#FBF5EF] rounded-md flex justify-center items-center relative"
    >
      <div className="relative">
        <div className="absolute z-[2] w-[300px] h-[300px] rounded-md object-center object-cover overflow-hidden flex items-center justify-center transition-all duration-500 album-cover">
          <Image src={dirtyBlonde} height={300} width={300} alt="song_name" />
        </div>
        <div className="w-[300px] h-[300px] rounded-full object-center object-cover overflow-hidden flex items-center justify-center transition-all duration-500 album-cover-round">
          <Image
            src={dirtyBlonde}
            height={300}
            width={300}
            alt="song_name"
            className="spin"
          />
        </div>
      </div>
      <div className="flex justify-between p-4 w-full absolute bottom-0">
        <p className="text-sm uppercase">{name}</p>
        <p className="text-sm uppercase">{year}</p>
      </div>
    </a>
  );
}

function Music() {
  return (
    <section id="music" className="py-20 px-12 mb-20 min-h-[100dvh]">
      <div className="marquee">
        <h2 className="text-[144px] uppercase marquee-content scrollX">
          <span className="whitespace-nowrap">New Music</span>
          <Image src={circleIcon} alt="spinning_flower" />
          <span className="whitespace-nowrap">New Releases</span>
          <Image src={circleIcon} alt="spinning_flower" />
          <span className="whitespace-nowrap">New Music</span>
        </h2>
        <h2 className="text-[144px] uppercase marquee-content scrollX">
          <span className="whitespace-nowrap">New Music</span>
          <Image src={circleIcon} alt="spinning_flower" />
          <span className="whitespace-nowrap">New Releases</span>
          <Image src={circleIcon} alt="spinning_flower" />
          <span className="whitespace-nowrap">New Music</span>
        </h2>
      </div>
      <div className="flex mt-24 justify-between gap-8">
        {songs.map((song, index) => (
          <MusicCard
            key={index}
            name={song.name}
            year={song.year}
            url={song.url}
          />
        ))}
      </div>
    </section>
  );
}

export default Music;
