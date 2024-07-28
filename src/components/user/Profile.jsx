"use client";

import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

export default function Profile(props) {
  const { userData } = props;
  const [file, setFile] = useState(null);

  return (
    <div className="mb-10">
      <UpdateProfile userData={userData} />
      <div className="container md:flex mt-10 gap-6">
        <div className="md:w-[55%] mx-auto">
          <Card className="">
            <CardHeader>User Details</CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-[200px] mx-auto">
                  <AspectRatio ratio={16 / 16} className="rounded">
                    <Image
                      fill={true}
                      alt="profile"
                      className="object-cover rounded-full hover:object-scale-down"
                      src={userData?.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </AspectRatio>
                </div>
                <div className="mt-4 md:max-w-[450px] mx-auto">
                  <h2 className="text-2xl font-bold">{userData?.name}</h2>
                  <p className="text-lg ">{userData?.email}</p>
                  <div className="mt-4 p-4 bg-secondary rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium ">Aadhar:</span>
                      <span className="text-sm ">{userData?.aadhar}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium ">Age:</span>
                      <span className="text-sm ">{userData?.age}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium ">Phone:</span>
                      <span className="text-sm ">{userData?.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium ">User Type:</span>
                      <span className="text-sm ">{userData?.userType}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium ">Driver Type:</span>
                      <span className="text-sm ">{userData?.driverType}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium ">RC:</span>
                      <span className="text-sm ">{userData?.rc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-[45%]">
          <Card>
            <CardHeader>User Stats</CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium ">Rating:</span>
                  <span className="text-sm ">0</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium ">
                    Total Loads Taken testing:
                  </span>
                  <span className="text-sm ">0</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium ">Total Views:</span>
                  <span className="text-sm ">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
