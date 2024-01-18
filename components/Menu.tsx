"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import menuImg from "@/public/assets/westendMenu.jpg";
import { HiMiniArrowRight, HiMiniArrowUpRight } from "react-icons/hi2";

type MenuProps = {
  menuToggle: boolean;
  setMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

function Menu({ menuToggle, setMenuToggle }: MenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        menuToggle &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuToggle(false);
      }
    };

    const handleScroll = () => {
      setScrolling(true);
      setMenuToggle(false);
    };

    if (menuToggle) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuToggle, setMenuToggle]);
  return (
    <div
      ref={menuRef}
      id="menu"
      className={`flex flex-col gap-12 bg-trace-ash text-bridal-health p-4 lg:px-12 lg:py-8 z-20 fixed w-full transition-all duration-700 ${
        menuToggle ? "menu-open" : "menu-closed"
      }`}
    >
      <div className="menu-nav flex justify-between w-full">
        <p className="uppercase tracking-wide">Westend</p>
        <button
          className="uppercase tracking-wide"
          onClick={() => setMenuToggle(false)}
        >
          Close
        </button>
      </div>
      <div className="flex flex-col-reverse gap-12 lg:gap-0 lg:flex-row w-full justify-between">
        <div className="w-[90%] h-[200px] lg:w-[500px] lg:h-[400px] rounded-md object-cover object-center overflow-hidden flex items-center justify-center">
          <Image src={menuImg} height={400} width={500} alt="Westend Live" />
        </div>
        <div className="flex justify-between lg:flex-start lg:gap-12">
          <div className="flex flex-col gap-4 text-base lg:text-2xl">
            <p className="text-swiss-coffee">Sitemap</p>
            <nav>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center">
                  <Link href="/" onClick={() => setMenuToggle(false)}>
                    Home
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#about" onClick={() => setMenuToggle(false)}>
                    About
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#music" onClick={() => setMenuToggle(false)}>
                    Music
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#sets" onClick={() => setMenuToggle(false)}>
                    Sets
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#events" onClick={() => setMenuToggle(false)}>
                    Events
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#awards" onClick={() => setMenuToggle(false)}>
                    Awards
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#shop" onClick={() => setMenuToggle(false)}>
                    Shop
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-4 text-base lg:text-2xl">
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
      </div>
      <div className="menu-footer tracking-wider">
        <div className="w-full border border-b-bridal-health"></div>
        <div className="flex w-full justify-between font-light tracking-wider mt-6 mb-2 lg:mb-0 lg:mt-8">
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
            <Link href="/imprint" onClick={() => setMenuToggle(false)}>
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
