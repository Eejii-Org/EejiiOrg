"use client";
import Link from "next/link";
import { EventType } from "@/types";
import { EventCard } from "./eventcard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "../icons";
import Image from "next/image";
import { Button } from "../button";

export const EventsBody = ({
  lastPageIndex,
  events,
  pageIndex,
  featuredEvents,
}: {
  lastPageIndex: number;
  events: EventType[];
  pageIndex: number;
  featuredEvents: EventType[];
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      router.push(`/events?page=1&q=${search}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <div className="flex flex-1 w-full flex-col items-center gap-8">
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col gap-6 w-full">
          {/* Events Search */}
          <div className="flex flex-col p-6 bg-white w-full gap-6  drop-shadow rounded-2xl">
            <h1 className="text-3xl font-semibold">Арга хэмжээ хайх</h1>
            <div className="flex flex-row gap-6 flex-1">
              <div className="flex-1 flex justify-between px-4 py-5 md:py-5 md:px-6 bg-white rounded-full border">
                <input
                  className="w-full outline-none text-lg"
                  placeholder="Хайх"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Search />
              </div>
            </div>
          </div>
          {/* Featured Events */}
          <FeaturedEventsCarousel featuredEvents={featuredEvents} />
        </div>
        <div className="min-w-80 bg-primary rounded-2xl flex items-center justify-center text-white font-bold">
          Ad Space
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-1 grid grid-cols-4 gap-8">
          {events.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>
      </div>
      <Pagination pageIndex={Number(pageIndex)} lastPageIndex={lastPageIndex} />
    </div>
  );
};

const Pagination = ({
  pageIndex,
  lastPageIndex,
}: {
  pageIndex: number;
  lastPageIndex: number;
}) => {
  return (
    <div className="flex flex-row gap-2">
      {pageIndex >= 3 && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/events",
            query: {
              page: pageIndex - 2,
            },
          }}
        >
          {pageIndex - 2}
        </Link>
      )}
      {pageIndex >= 2 && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/events",
            query: {
              page: pageIndex - 1,
            },
          }}
        >
          {pageIndex - 1}
        </Link>
      )}
      <Link
        className=" w-8 h-8 flex items-center justify-center rounded-sm text-white bg-primary"
        href={{
          pathname: "/events",
          query: {
            page: pageIndex,
          },
        }}
      >
        {pageIndex}
      </Link>
      {pageIndex + 1 <= lastPageIndex && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/events",
            query: {
              page: pageIndex + 1,
            },
          }}
        >
          {pageIndex + 1}
        </Link>
      )}
      {pageIndex + 2 <= lastPageIndex && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/events",
            query: {
              page: pageIndex + 2,
            },
          }}
        >
          {pageIndex + 2}
        </Link>
      )}
    </div>
  );
};

const FeaturedEventsCarousel = ({
  featuredEvents,
}: {
  featuredEvents: EventType[];
}) => {
  const [index, setIndex] = useState(0);
  const onLeft = () => {
    if (index == 0) return;
    setIndex(index - 1);
  };
  const onRight = () => {
    if (index == featuredEvents.length - 1) return;
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
          index == featuredEvents.length - 3
            ? "opacity-50 bg-white/20 cursor-default"
            : "flex"
        }`}
        onClick={onRight}
      >
        <ChevronRightIcon color="white" />
      </button>
      {featuredEvents.map((featuredEvent, i) => (
        <div
          className={`flex-1 items-center absolute left-0 top-0 w-full h-full flex justify-center flex-col transition-all duration-300 ${
            i == index ? "opacity-100" : "opacity-0"
          }`}
          key={i}
        >
          <Image
            src={"/assets/placeholder.svg"}
            fill
            className="object-cover"
            alt={"Picture-" + featuredEvent.title}
          />
          <h3 className="relative z-10 font-medium text-white">
            {featuredEvent.title}
          </h3>
          <h2 className="relative z-10 font-medium text-3xl text-white">
            {featuredEvent.title}
          </h2>
          <Button className="relative mt-8 !py-4 !px-6 !rounded">
            Хандив өгөх
          </Button>
        </div>
      ))}
    </div>
  );
};
