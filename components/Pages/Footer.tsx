import Link from "next/link";
import { HiMiniArrowRight, HiMiniArrowUpRight } from "react-icons/hi2";

function Footer() {
  return (
    <footer
      id="footer"
      className="min-h-[100dvh] w-full flex flex-col justify-between bg-trace-ash text-bridal-health p-4 lg:px-12 lg:pt-28 fixed bottom-0 z-[1]"
    >
      <div className="flex gap-8 lg:gap-0 flex-col-reverse lg:flex-row w-full justify-between mt-20 lg:mt-0">
        <div className="flex gap-12">
          <div className="flex flex-col gap-4 text-base lg:text-xl">
            <p className="text-swiss-coffee">Menu</p>
            <nav>
              <ul className="flex flex-col gap-2 lg:flex-wrap lg:h-[200px]">
                <li className="flex gap-2 items-center">
                  <Link href="#home">Home</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#about">About</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#coffee-discovery">Coffees</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#favorites">Favorites</Link>
                  <HiMiniArrowRight color={"#FFFBF6"} />
                </li>
                <li className="flex gap-2 items-center">
                  <Link href="#shop">Shop</Link>
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
        <Link href="#home" className="text-base lg:text-xl">
          Back To Top
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <label
          htmlFor="imani-coffee"
          className="text-[16dvw] lg:text-[8dvw] leading-[80%] pointer-events-none font-medium tracking-tighter uppercase"
        >
          Imani Coffee
        </label>
        <div className="w-full border border-b-bridal-health"></div>
        <div className="flex w-full justify-between font-light tracking-wider mb-6 ">
          <p className="hidden lg:flex">Celebrating Uniqueness</p>
          <div className="flex gap-4 lg:gap-16">
            <a className="hidden lg:flex" href="mailto: info@imanicoffee.com">
              info@imanicoffee.com
            </a>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
