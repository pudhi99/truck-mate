import LoadsBGImage from "@/components/Loads/LoadsBGImage";
import LoadsComponent from "@/components/Loads/LoadsComponent";
import LoadsFilter from "@/components/Loads/LoadsFilter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import mongo from "@/utils/db";
import Image from "next/image";
import React from "react";

const Loads = async ({ params, searchParams }) => {
  console.log(params);
  console.log(searchParams);
  const origin = params.loads + "," + searchParams?.state;
  const destination =
    searchParams?.destination != ""
      ? searchParams?.destination + "," + searchParams?.destate
      : "";
  const sortBy = searchParams?.sortby;

  const findQuery = {
    origin: origin,
  };
  // Conditionally add the destination to the query if it's defined
  if (destination != "") {
    findQuery.destination = destination;
  }
  const sortQuery = {};
  switch (sortBy) {
    case "distance":
      sortQuery.distance = -1;
      break;
    case "date":
      sortQuery.date = 1;
      break;
    default:
      sortQuery.price = -1;
      break;
  }

  console.log(origin, destination, sortBy);

  const db = await mongo();
  // const loads = await db.collection("loads").find({}).toArray();

  const loads = await db
    .collection("loads")
    .find(findQuery)
    .sort(sortQuery)
    .toArray();

  // console.log(loads);

  return (
    <div>
      <LoadsBGImage />
      <div className="container mx-auto p-4 -mt-14">
        <div className="w-full flex justify-center ">
          <LoadsFilter params={params.loads} searchParam={searchParams} />
        </div>
      </div>
      <LoadsComponent loads={loads} />
    </div>
  );
};

export default Loads;
