"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CityFinder from "../contractor/CityFinder";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const LoadsFilter = (props) => {
  const { params, searchParam } = props;
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (paramsToUpdate) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(paramsToUpdate).forEach((key) => {
        params.set(key, paramsToUpdate[key]);
      });
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const { state, destination, destate, sortby } = searchParam && searchParam;
    setOrigin(params && params + "," + state);
    setDestination(
      destination && destination != "" ? destination + "," + destate : ""
    );
    setSortBy(sortby || "price");
  }, [params, searchParams]);

  const updateQuery = () => {
    const query = createQueryString({
      state: origin.split(",")[1] || "",
      destination: (destination && destination.split(",")[0]) || "",
      destate: (destination && destination.split(",")[1]) || "",
      sortby: sortBy,
    });
    const segments = pathname.split("/");
    segments[2] = origin.split(",")[0]; // Assuming the path segment to replace is the third one
    const newPathname = segments.join("/");

    router.push(newPathname + "?" + query);
  };
  return (
    <Card className="min-w-[80%] h-36 md:h-28 ">
      <div className="w-full flex justify-center h-full items-center gap-3 p-3">
        <div className="md:flex w-full gap-3">
          <div className="relative grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="origin">Origin</Label>
            <Input
              type="text"
              id="origin"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <CityFinder value={origin} settingValue={setOrigin} />
          </div>
          <div className="relative grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="destination">Destination</Label>
            <Input
              type="text"
              id="destination"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <CityFinder value={destination} settingValue={setDestination} />
          </div>
        </div>
        <div className="md:flex  gap-3">
          <Select
            value={sortBy}
            onValueChange={setSortBy}
            defaultValue={"price"}
          >
            <div className=" grid w-fit max-w-sm items-center gap-1.5 md:mb-2">
              <Label htmlFor="">Sort By</Label>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="mt-3 md:mt-5" onClick={() => updateQuery()}>
            Find
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoadsFilter;
