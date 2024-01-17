"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { Menu } from ".";

export default function Header() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div id="header">
      <div className="flex justify-between w-full p-4 lg:px-12 lg:py-8 fixed top-0 z-20">
        <Link
          href="/"
          className="uppercase text-bridal-health mix-blend-color-burn tracking-wide"
        >
          Westend
        </Link>
        <nav>
          <button
            className="uppercase text-bridal-health mix-blend-color-burn tracking-wide"
            onClick={() => setMenuToggle((prev) => !prev)}
          >
            Menu
          </button>
        </nav>
      </div>

      <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </div>
  );
}
