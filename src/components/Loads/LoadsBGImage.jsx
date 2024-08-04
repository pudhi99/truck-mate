import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

const LoadsBGImage = () => {
  return (
    <div className="w-full h-[250px] bg-slate-900">
      <div className="md:flex md:container gap-9">
        <div className="md:w-1/2  flex items-center">
          <h1 className="text-4xl h-[80px] text-center">
            Book loads form all over india
          </h1>
        </div>
        <div className="w-[250px] ml-[30%] md:ml-0 md:w-[400px]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/Logistic_workers.png"
              width={640}
              height={275}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default LoadsBGImage;
