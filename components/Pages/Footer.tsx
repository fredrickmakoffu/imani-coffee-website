import Link from "next/link";
import { HiMiniArrowRight, HiMiniArrowUpRight } from "react-icons/hi2";

function Footer() {
  return (
    <footer
      id="footer"
      className="min-h-[100dvh] max-w-full flex flex-col justify-between bg-trace-ash text-bridal-health p-4 lg:px-12 lg:pt-28 fixed bottom-0 z-[1]"
    >
      <div className="flex gap-8 lg:gap-0 flex-col-reverse lg:flex-row w-full justify-between mt-20 lg:mt-0">
        <div className="flex gap-12">
          <div className="flex flex-col gap-4 text-base lg:text-2xl">
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
          <div className="flex flex-col gap-4 text-base lg:text-2xl">
            <p className="text-swiss-coffee">Connect</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <a
                  href="https://www.instagram.com/itsthewestend/?"
                  target="_blank"
                >
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
                  YouTube
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
          <div className="flex flex-col gap-4 text-base lg:text-2xl">
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
        <Link href="#home" className="text-base lg:text-2xl">
          Back To Top
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <label
          htmlFor="westend"
          className="text-[24.5dvw] leading-[80%] pointer-events-none"
        >
          Westend
        </label>
        <div className="w-full border border-b-bridal-health"></div>
        <div className="flex w-full justify-between font-light tracking-wider mb-6 ">
          <p className="hidden lg:flex">New York – New York</p>
          <div className="flex gap-4 lg:gap-16">
            <a className="hidden lg:flex" href="mailto: westend@ayita.com">
              westend@ayita.com
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
    </footer>
  );
}

export default Footer;
