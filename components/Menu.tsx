import Image from "next/image";
import Link from "next/link";
import menuImg from "@/public/assets/westendMenu.jpg";
import { HiMiniArrowRight, HiMiniArrowUpRight } from "react-icons/hi2";

function Menu() {
  return (
    <section
      id="menu"
      className="flex flex-col gap-20 bg-trace-ash text-bridal-health px-12 py-8 z-10"
    >
      <div className="menu-nav flex justify-between w-full">
        <p className="uppercase tracking-wider">Westend</p>
        <button className="uppercase cursor-pointer tracking-wider">
          Close
        </button>
      </div>
      <div className="flex w-full justify-between">
        <div className="w-[500px] h-[400px] rounded-md object-cover object-center overflow-hidden flex items-center justify-center">
          <Image src={menuImg} height={400} width={500} alt="Westend Live" />
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-4 text-2xl">
            <p className="text-swiss-coffee">Sitemap</p>
            <nav>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center">
                  <Link href="#home">Home</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#about">About</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#Music">Music</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#sets">Sets</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#events">Events</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#awards">Awards</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#shop">Shop</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-4 text-2xl">
            <p className="text-swiss-coffee">Connect</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <a href="https://www.instagram.com/itsthewestend/?">
                  Instagram
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="https://www.tiktok.com/@itsthewestend" target="_blank">
                  TikTok
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="http://twitter.com/itsthewestend" target="_blank">
                  X
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a
                  href="https://www.youtube.com/@itsthewestend"
                  target="_blank"
                >
                  Youtube
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="http://facebook.com/itsthewestend" target="_blank">
                  Facebook
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a
                  href="https://open.spotify.com/artist/4epc3Bd0DOBA0kDywkRAsu?si=zB9WbHfkTL-p_jDNH5mokg"
                  target="_blank"
                >
                  Spotify
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-2xl">
            <p className="text-swiss-coffee">Platforms</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <a href="https://traceamounts.nyc/" target="_blank">
                  Trace Amounts
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="https://kick-bass.com/" target="_blank">
                  Kick & Bass
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a
                  href="https://www.beatport.com/artist/westend/576028"
                  target="_blank"
                >
                  Beatport
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-footer tracking-wider">
        <div className="w-full border border-b-bridal-health"></div>
        <div className="flex w-full justify-between font-light tracking-wider mt-8">
          <p>New York – New York</p>
          <div className="flex gap-16">
            <a href="mailto: itsthewestend@gmail.com">
              itsthewestend@gmail.com
            </a>
            <a
              href="https://www.trackstack.app/inbox/TRACEAMOUNTS"
              target="_blank"
            >
              Demos
            </a>
            <Link href="/imprint">Imprint</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
