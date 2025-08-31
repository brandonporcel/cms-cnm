import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="absolute top-8 left-8 z-20">
      <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />

      <p className="text-sm mt-1 leading-0 font-normal">
        Content Management System
      </p>
      <span className="text-sm leading-2 font-bold">CINEMA</span>
      <div className="text-xs mt-2 max-w-32 leading-tight">
        Testing Sanity with cool font posters movies
      </div>
    </div>
  );
}

export default Header;
