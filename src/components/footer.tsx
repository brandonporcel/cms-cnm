import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="absolute bottom-8 left-8 z-20">
      <div className="flex gap-2 text-xs">
        <Link
          href={"https://github.com/brandonporcel/cms-cnm"}
          target="_blank"
          className="hover:text-[#669]"
        >
          code
        </Link>
        |
        <Link
          href={"https://linkedin.com/in/brandonporcel"}
          target="_blank"
          className="hover:text-[#669]"
        >
          contact
        </Link>
      </div>
    </div>
  );
}

export default Footer;
