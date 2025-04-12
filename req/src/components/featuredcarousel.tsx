"use client";

import { EventType } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { useState } from "react";
import { Button } from "./button";
import Image from "next/image";

export const FeaturedCarousel = ({ featured }: { featured: EventType[] }) => {
  const [index, setIndex] = useState(0);
  const onLeft = () => {
    if (index == 0) return;
    setIndex(index - 1);
  };
  const onRight = () => {
    if (index == featured.length - 1) return;
    setIndex(index + 1);
  };
  return (
    <div className="flex-1 min-h-80 relative flex">
      <button
        className={`absolute top-1/2 -translate-y-1/2 left-2 bg-black/20 z-40 rounded-full backdrop-blur-sm p-2 transition-all ${
          index == 0 ? "opacity-50 bg-white/20 cursor-default" : "flex"
        }`}
        onClick={onLeft}
      >
        <ChevronLeftIcon color="white" />
      </button>
      <button
        className={`absolute top-1/2 -translate-y-1/2 right-2 bg-black/10 z-40 rounded-full backdrop-blur-sm p-2 transition-all ${
          index == featured.length - 3
            ? "opacity-50 bg-white/20 cursor-default"
            : "flex"
        }`}
        onClick={onRight}
      >
        <ChevronRightIcon color="white" />
      </button>
      {featured.map((event, i) => (
        <div
          className={`flex-1 items-center absolute left-0 top-0 w-full h-full flex justify-center flex-col transition-all duration-300 ${
            i == index ? "opacity-100" : "opacity-0"
          }`}
          key={i}
        >
          <Image
            src={
              event.images.find((img) => img.type == "main")?.path ||
              "/assets/placeholder.svg"
            }
            fill
            className="object-cover"
            alt={"Picture-" + event.title}
          />
          <h3 className="relative z-10 font-medium text-white">
            {event.title}
          </h3>
          <h2 className="relative z-10 font-medium text-3xl text-white">
            {event.title}
          </h2>
          <Button className="relative mt-8 !py-4 !px-6 !rounded">
            Хандив өгөх
          </Button>
        </div>
      ))}
    </div>
  );
};
