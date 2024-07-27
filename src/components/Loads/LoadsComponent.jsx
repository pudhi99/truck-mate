import React from "react";
import { json } from "stream/consumers";
import { Card } from "@/components/ui/card";
const LoadsComponent = (props) => {
  const { loads } = props;
  return (
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
                <div className="text-gray-500">{eachLoad.distance} km</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="text-gray-600 mr-2">
                  🚚 {eachLoad.truckType.toUpperCase()} . {eachLoad.bodyType}{" "}
                  body
                </div>
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
              <div className="mt-4 text-right">
                <p className=" text-lg font-semibold">
                  ₹{eachLoad.price.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">
                  (₹{(eachLoad.price / eachLoad.quantity).toLocaleString()} /
                  tonne)
                </p>
                <p className="text-gray-400 text-sm">
                  (To Pay + ₹
                  {(
                    eachLoad.price /
                    (eachLoad.quantity * eachLoad.distance)
                  ).toFixed(2)}{" "}
                  / tonne-km)
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
  );
};

export default LoadsComponent;
