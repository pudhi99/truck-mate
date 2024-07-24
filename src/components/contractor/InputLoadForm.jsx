import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import CityFinder from "./CityFinder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";

const InputLoadForm = (props) => {
  const { form } = props;
  const [sameCityError, setSameCityError] = useState("");
  const [tyresArray, setTyresArray] = useState([]);
  // 2. Define a submit handler.
  const onSubmit = async (formData) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(formData);
    const response = await fetch("/api/loads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      // Handle error response
      const errorText = await response.text(); // Get the response as text
      console.error("Error:", errorText);
    }
  };
  useEffect(() => {
    if (
      form.watch("origin").length > 0 &&
      form.watch("origin") === form.watch("destination")
    ) {
      setSameCityError("Origin and Destination should not be same");
    } else {
      setSameCityError("");
    }

    console.log();

    switch (form.watch("truckType")) {
      case "semiTruck":
        setTyresArray([{ tyres: "6", label: "6 Tyres" }]);
        form.setValue("tyres", "6");
        break;
      case "truck":
      case "hmva":
        setTyresArray([
          { tyres: "10", label: "10 Tyres" },
          { tyres: "12", label: "12 Tyres" },
          { tyres: "14", label: "14 Tyres" },
          { tyres: "16", label: "16 Tyres" },
        ]);
        break;
      case "trailer":
        setTyresArray([]);
        form.setValue("tyres", "trailer");
        break;
      default:
        setTyresArray([
          { tyres: "6", label: "6 Tyres" },
          { tyres: "10", label: "10 Tyres" },
          { tyres: "12", label: "12 Tyres" },
          { tyres: "14", label: "14 Tyres" },
          { tyres: "16", label: "16 Tyres" },
        ]);
        break;
    }

    if (form.watch("includeLUC")) {
      form.setValue("LUcharges", 1);
    } else {
      form.setValue("LUcharges", 0);
    }
  }, [
    form.watch("truckType"),
    form.watch("origin"),
    form.watch("destination"),
    form.watch("includeLUC"),
  ]);

  const onChangeRemarks = (event) => {
    event.preventDefault();
    form.setValue("remarks", event.target.value);
  };

  return (
    <div className="">
      <ScrollArea className="mt-2 pr-5 h-[400px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mx-1"
          >
            <div className="relative">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Origin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CityFinder form={form} inputField={"origin"} />
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="Destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CityFinder form={form} inputField={"destination"} />
            </div>
            <p className="text-red-500 my-2">{sameCityError}</p>
            <FormField
              control={form.control}
              name="materialName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Material Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (Ton)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity (Ton)"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bodyType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Truck Body Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="open" />
                        </FormControl>
                        <FormLabel className="font-normal">Open Body</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="closed" />
                        </FormControl>
                        <FormLabel className="font-normal">Closed</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="truckType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Truck Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="semiTruck" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Semi Truck
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="truck" />
                        </FormControl>
                        <FormLabel className="font-normal">Truck</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="trailer" />
                        </FormControl>
                        <FormLabel className="font-normal">Trailer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hmva" />
                        </FormControl>
                        <FormLabel className="font-normal">HMVA</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tyres"
              render={({ field }) => (
                <>
                  {tyresArray.length > 0 ? (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Tyres</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex  space-x-1"
                        >
                          {tyresArray.map((eachTyres) => (
                            <FormItem
                              key={eachTyres.tyres}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={eachTyres.tyres} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {eachTyres.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) : null}
                </>
              )}
            />
            <FormField
              control={form.control}
              name="advance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advance Amount (in %)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Advance in %"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Card>
                <CardContent>
                  <div className="flex gap-3 h-20 pt-4 items-center">
                    <div className="w-[60%]">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Expected Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter Price"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <p>Total Fright</p>
                      <p>for {form.watch("quantity")} Tonnes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <FormField
              control={form.control}
              name="includeLUC"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Does your expected price {form.watch("price")} Include
                    Loading and unloading charges
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={true} />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={false} />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("includeLUC") ? null : (
              <FormField
                control={form.control}
                name="LUcharges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Expected Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of loading</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <= new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select the date for loading</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Textarea
              onChange={(event) => onChangeRemarks(event)}
              placeholder="Type your message here."
            />

            {sameCityError === "" ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Check Warning
              </Button>
            )}
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default InputLoadForm;
