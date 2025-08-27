"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      className={`flex flex-col gap-12 bg-trace-ash text-bridal-health p-4 lg:px-12 lg:py-8 z-50 fixed w-full transition-all duration-700 ${
        menuToggle ? "menu-open" : "menu-closed"
      }`}
    >
      <div className="menu-nav flex justify-between w-full">
        <Link
          href={"/"}
          className="uppercase tracking-wide font-bold"
          onClick={() => setMenuToggle(false)}
        >
          Imani Coffee
        </Link>
        <button
          className="uppercase tracking-wide"
          onClick={() => setMenuToggle(false)}
        >
          Close
        </button>
      </div>
      <div className="flex flex-col-reverse gap-12 lg:gap-0 lg:flex-row w-full justify-between">
        <div className="relative w-full h-60 lg:w-[30vw] lg:h-[20vw] max-w-[700px] max-h-[700px] rounded-lg overflow-hidden">
          <Image
            src="/images/coffee-1.jpg"
            alt="Westend Live"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex justify-between lg:flex-start lg:gap-12">
          <div className="flex flex-col gap-4 text-base lg:text-xl">
            <p className="text-swiss-coffee">Menu</p>
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
                  <Link href="/#coffee-discovery" onClick={() => setMenuToggle(false)}>
                    Coffees
                  </Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="/#favorites" onClick={() => setMenuToggle(false)}>
                    Favorites
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
          <div className="flex flex-col gap-4 text-base lg:text-xl">
            <p className="text-swiss-coffee">Connect</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <a href="https://www.instagram.com/imanicoffee/" target="_blank">
                  Instagram
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="https://www.tiktok.com/@imanicoffee" target="_blank">
                  TikTok
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="http://twitter.com/imanicoffee" target="_blank">
                  X
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="https://www.youtube.com/@imanicoffee" target="_blank">
                  YouTube
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
              <li className="flex gap-2 items-center">
                <a href="http://facebook.com/imanicoffee" target="_blank">
                  Facebook
                </a>
                <HiMiniArrowUpRight color={"#FFFBF6"} />
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-base lg:text-xl">
            {/* No platforms for coffee brand */}
          </div>
        </div>
      </div>
      <div className="menu-footer tracking-wider">
        <div className="w-full border border-b-bridal-health"></div>
        <div className="flex w-full justify-between font-light tracking-wider mt-6 mb-2 lg:mb-0 lg:mt-8">
          <p className="hidden lg:flex">Celebrating Uniqueness</p>
          <div className="flex gap-4 lg:gap-16">
            <a className="hidden lg:flex" href="mailto: info@imanicoffee.com">
              info@imanicoffee.com
            </a>
            <Link href="/contact" onClick={() => setMenuToggle(false)}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
