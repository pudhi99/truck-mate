import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { cities } from "@/lib/cities";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const CityFinder = (props) => {
  const { value, settingValue, formKey } = props;
  const [filteredCities, setFilteredCities] = useState([]);
  useEffect(() => {
    // console.log(form.watch("origin"));
    if (value && value.length > 2) {
      const filteringCities = cities.filter((city) => {
        return city.city.toLowerCase(value).startsWith(value.toLowerCase());
      });
      setFilteredCities(filteringCities);
      console.log(filteringCities);
    }
  }, [value]);

  const updateSearchField = (city) => {
    if (formKey && formKey != "") {
      settingValue(formKey, city.city + ", " + city.state);
    } else {
      settingValue(city.city + ", " + city.state);
    }
  };
  return (
    <div>
      <div className="absolute top-20 z-10 w-full">
        {value && value.length > 2 && filteredCities.length > 0 ? (
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
