import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex w-fit h-full items-center">
        <Image src="/logopng.png" alt="logo" width={60} height={50} />
        <h1 className="foldit text-xl md:text-3xl">Truck Mate</h1>
      </div>
    </Link>
  );
}

export default Logo;
