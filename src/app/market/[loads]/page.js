import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import mongo from "@/utils/db";
import Image from "next/image";
import React from "react";
import { json } from "stream/consumers";

const Loads = async ({ params }) => {
  const db = await mongo();
  const loads = await db.collection("loads").find({}).toArray();

  console.log(loads);

  return (
    <div>
      <div className="w-full h-[250px] bg-slate-900">
        <div className="flex md:container gap-9">
          <div className="w-1/2 flex items-center">
            <h1 className="text-4xl ">Book loads form all over india</h1>
          </div>
          <div className="w-[400px]">
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
      <div className="w-full flex justify-center -mt-10">
        <Card className="min-w-[80%]  h-28 ">
          <p>page</p>
        </Card>
      </div>
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loads.map((eachLoad) => (
              <Card key={eachLoad._id} className="shadow-md rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="text-green-600 font-semibold mr-1">
                        {eachLoad.origin.split(",")[0]}
                      </div>
                      <div className="text-gray-500">
                        {eachLoad.origin.split(",")[1]}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-red-600 font-semibold mr-1">
                        {eachLoad.destination.split(",")[0]}
                      </div>
                      <div className="text-gray-500">
                        {eachLoad.destination.split(",")[1]}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500">597 km</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-gray-600 mr-2">
                    🚚 {eachLoad.truckType.toUpperCase()} . {eachLoad.bodyType}{" "}
                    body
                  </div>
                  <div className="text-gray-600">14 feet</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-gray-600">
                    📦 {eachLoad.materialName} ({eachLoad.quantity} Tonnes)
                  </div>
                </div>
                <div className="text-orange-500 mt-2">
                  🕒 Loading {new Date(eachLoad.date).toLocaleDateString()} at{" "}
                  {new Date(eachLoad.date).toLocaleTimeString()}
                </div>
                <div className="flex items-center mt-4">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://via.placeholder.com/50"
                    alt="Transporter"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Transporter Name</p>
                    <p className="text-xs text-gray-500">Transporter</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-800 text-lg font-semibold">
                    ₹{eachLoad.price.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">
                    (To Pay + ₹
                    {(eachLoad.price / (eachLoad.quantity * 597)).toFixed(2)} /
                    tonne-km)
                  </p>
                  <p className="text-gray-400 text-sm">
                    (Inclusive of all charges)
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full">
                  Bid Now
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loads;
