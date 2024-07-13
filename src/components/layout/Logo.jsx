import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="flex w-fit h-full items-center">
      <Image src="/logopng.png" alt="logo" width={60} height={50} />
      <h1 className="foldit text-3xl">Truck Mate</h1>
    </div>
  );
}

export default Logo;
