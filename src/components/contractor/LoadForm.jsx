"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CopyIcon, PlusCircledIcon, RocketIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { z } from "zod";
import InputLoadForm from "./InputLoadForm";

const formSchema = z.object({
  origin: z.string().min(2, {
    message: "Origin must be at least 2 characters.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters",
  }),
  materialName: z.string().min(2, {
    message: "Material Name must be at least 2 characters",
  }),
  quantity: z.number().positive().gte(1, {
    message: "quantity should be grater than 1ton",
  }),
  bodyType: z.enum(["open", "closed"], {
    required_error: "You need to select a body type.",
  }),
  truckType: z.enum(["semiTruck", "truck", "trailer", "hyva"], {
    required_error: "You need to select a truck type.",
  }),
  tyres: z.enum(["6", "10", "12", "14", "16", "trailer"], {
    required_error: "You need to select a no of tyres.",
  }),
  advance: z
    .number()
    .gte(0, {
      message: "Quantity should be at least 0",
    })
    .lte(100, {
      message: "Quantity should be between 0 and 100",
    }),
  price: z.number().positive().gte(1, {
    message: "price should be grater than 0",
  }),
  LUcharges: z.number().positive().gte(0, {
    LUcharges: "Loading and Unloading charges should be grater than 0",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function LoadForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema), // Use Zod for validation
    defaultValues: {
      origin: "",
      destination: "",
      materialName: "",
      quantity: 0,
      bodyType: "",
      truckType: "",
      tyres: 0,
      advance: 0,
      price: 0,
      includeLUC: false,
      LUcharges: 0,
      date: null,
      remarks: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Create Load
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[300px] max-w-md md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Load</DialogTitle>
        </DialogHeader>
        <div className="md:flex items-center md:space-x-5">
          <div className="md:w-[300px]">
            <h1>Status</h1>
          </div>
          <Separator orientation="vertical " className="hidden md:block" />
          <div className="flex-1">
            <h1 className="">Location and material details</h1>
            <Alert className="bg-green-800 bg-opacity-50">
              <RocketIcon className="h-4 w-4" />
              <AlertDescription className="mt-1">
                8 trucks are awaiting near your location
              </AlertDescription>
            </Alert>
            <InputLoadForm form={form} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
