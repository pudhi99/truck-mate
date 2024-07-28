import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UpdateProfile = (props) => {
  const { userData } = props;
  const [imageError, setImageError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    age: z.number().gte(18, { message: "Age must be 18 or older." }),
    driverType: z.enum(["Driver", "Owner + Driver", "Owner"], {
      required_error: "You need to select Driver type type.",
    }),
    aadhar: z.string().min(12, { message: "Aadhar number must be 12 digits." }),
    image: z.string().optional(),
    rc: z.string().optional(), // Optional field
    rcImage: z.string().optional(), // Optional field
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: userData?.phoneNumber,
      name: userData?.name,
      age: userData?.age,
      aadhar: userData?.aadhar,
      image: userData?.image,
      rc: userData?.rc,
      rcImage: userData?.rcImage,
      driverType: userData?.driverType,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser);
        toast({
          description: "user updated successfully",
        });

        setIsOpen(false);
        router.push("/profile");
        // Handle successful update, e.g., show a success message
      } else {
        const { error } = await response.json();
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        });
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1]; // Get base64 string
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String, filename: file.name }),
      });
      const data = await response.json();
      if (response.ok) {
        setImageError("");
        form.setValue("image", data.url);
        console.log("Uploaded Image URL:", data.url);
      } else {
        setImageError("upload failed");
        console.error("Upload failed:", data.error);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="container mt-3 flex justify-end">
          <Button>
            <Pencil2Icon className="mr-2 h-4 w-4" /> Update Profile
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[300px] max-w-md md:max-w-4xl pr-2">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-2"
            >
              <div className=" md:flex gap-2">
                <div className="md:w-[45%] ">
                  <div className="w-[200px] mx-auto">
                    <AspectRatio
                      ratio={16 / 9}
                      className="bg-gray-50 rounded-lg"
                    >
                      <Image
                        fill={true}
                        // width={200}
                        alt="profile"
                        className="object-cover rounded-md"
                        src={form.watch("image")}
                      />
                    </AspectRatio>
                  </div>
                  <div className="mt-6 space-y-3">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image</FormLabel>
                          <FormControl>
                            <Input
                              id="picture"
                              type="file"
                              placeholder="Enter image URL"
                              onChange={(event) => handleFileChange(event)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="driverType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Driver Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex  space-x-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Driver" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Driver
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Owner + Driver" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Owner + Driver
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Owner" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Owner
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rcImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RC Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="Enter RC image URL"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className="md:w-[55%] space-y-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Age"
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
                  <FormField
                    control={form.control}
                    name="aadhar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aadhar Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Aadhar number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RC Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your RC number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="">
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
