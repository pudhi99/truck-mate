import LoadsBGImage from "@/components/Loads/LoadsBGImage";
import LoadsComponent from "@/components/Loads/LoadsComponent";
import LoadsFilter from "@/components/Loads/LoadsFilter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import mongo from "@/utils/db";
import Image from "next/image";
import React from "react";

const Market = async ({ params, searchParams }) => {
  const db = await mongo();
  const loads = await db.collection("loads").find({}).toArray();

  // console.log(loads);

  return (
    <div>
      <LoadsBGImage />
      <div className="md:container md:mx-auto p-4 -mt-14">
        <div className="w-full md:flex md:justify-center ">
          <LoadsFilter params={params.loads} searchParam={searchParams} />
        </div>
      </div>
      <LoadsComponent loads={loads} />
    </div>
  );
};

export default Market;
