"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu } from ".";

export default function Header() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div id="header">
      <button
        className="uppercase text-bridal-health mix-blend-difference m-4 lg:mt-8 lg:mr-12 fixed right-0 top-0 z-20 tracking-wide"
        onClick={() => setMenuToggle((prev) => !prev)}
      >
        Menu
      </button>

      <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </div>
  );
}
