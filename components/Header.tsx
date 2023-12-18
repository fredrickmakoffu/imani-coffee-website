import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <section
      id="header"
      className="flex justify-between w-full px-12 py-8 absolute top-0 z-10"
    >
      <Link
        href="/"
        className="uppercase text-bridal-health mix-blend-color-burn tracking-wider"
      >
        Westend
      </Link>
      <nav>
        <button className="uppercase text-bridal-health mix-blend-color-burn tracking-wider">
          Menu
        </button>
      </nav>
    </section>
  );
}
