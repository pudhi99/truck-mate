import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { cities } from "@/lib/cities";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const CityFinder = (props) => {
  const { form, inputField } = props;
  const [filteredCities, setFilteredCities] = useState([]);
  useEffect(() => {
    // console.log(form.watch("origin"));
    if (form.watch(inputField).length > 2) {
      const filteringCities = cities.filter((city) => {
        return city.city
          .toLowerCase(form.watch(inputField))
          .startsWith(form.watch(inputField).toLowerCase());
      });
      setFilteredCities(filteringCities);
      console.log(filteringCities);
    }
  }, [form.watch(inputField)]);

  const updateSearchField = (city) => {
    form.setValue(inputField, city.city + ", " + city.state);
  };
  return (
    <div>
      <div className="absolute top-20 z-10 w-full">
        {form.watch(inputField).length > 2 && filteredCities.length > 0 ? (
          <Card className="p-2">
            <ScrollArea className="max-h-28 h-28 pr-4">
              {filteredCities.map((eachCity) => (
                <div
                  className="flex h-7 items-center space-x-4 text-sm border border-secondary px-2 my-1 rounded-lg cursor-pointer"
                  key={eachCity.city}
                  onClick={() => updateSearchField(eachCity)}
                >
                  <div>{eachCity.city}</div>
                  <Separator orientation="vertical" className="text-red-600" />
                  <div>{eachCity.state}</div>
                </div>
              ))}
            </ScrollArea>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default CityFinder;
