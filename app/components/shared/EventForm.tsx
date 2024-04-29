"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { eventDefaultValues } from "@/constants";
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
import { eventFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUp } from "lucide-react";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "lucide-react";
import { CircleDollarSign } from "lucide-react";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};
const EventForm = ({ userId, type }: EventFormProps) => {
  const initialValues = eventDefaultValues;
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Event title"
                          {...field}
                          className="input-field"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Dropdown
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Event description"
                          {...field}
                          className="textarea"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <MapPin />

                        <Input
                          placeholder="Event location or Online"
                          {...field}
                          className="input-field"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" w-full flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <p className="ml-3 whitespace-nowrap text-gray-600">
                          Start Date:
                        </p>
                        <DatePicker
                          selected={field.value}
                          onSelect={(date: Date) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <p className="ml-3 whitespace-nowrap text-gray-600">
                          End Date:
                        </p>
                        <DatePicker
                          selected={field.value}
                          onSelect={(date: Date) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <CircleDollarSign />
                        <Input type="number" placeholder="Price" {...field} />
                        <FormField
                          control={form.control}
                          name="isFree"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center">
                                  <label
                                    htmlFor="isFree"
                                    className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Free Ticket
                                  </label>
                                  <Checkbox
                                    onCheckedChange={field.onChange}
                                    checked={field.value}
                                    id="isFree"
                                    className="mr-2 h-5 w-5 border"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <Link />

                        <Input
                          placeholder="URL"
                          {...field}
                          className="input-field"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="button col-span-2 w-full"
            >
              {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EventForm;
