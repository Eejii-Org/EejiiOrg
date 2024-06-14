"use client";
import Link from "next/link";
import { EventType } from "@/types";
import { ProjectCard } from "./projectcard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "../icons";
import Image from "next/image";
import { Button } from "../button";

export const ProjectBody = ({
  lastPageIndex,
  projects,
  pageIndex,
  featuredProjects,
  t,
  q,
}: {
  lastPageIndex: number;
  projects: any[];
  pageIndex: number;
  featuredProjects: any[];
  t: string;
  q: string;
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      router.push(`/projects?page=1&q=${search}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <div className="flex flex-1 w-full flex-col items-center gap-8 z-10 mt-36">
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col gap-6 w-full">
          {/* Projects Search */}
          <div className="flex flex-col p-6 bg-white w-full gap-6 drop-shadow rounded-2xl">
            <h1 className="text-2xl font-semibold">
              Та ямар төсөл дэмжихийг хүсч байна вэ?
            </h1>
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
          {/* Featured Projects */}
          <FeaturedCarousel featured={featuredProjects} />
        </div>
        <div className="min-w-80 bg-primary rounded-2xl flex items-center justify-center text-white font-bold">
          Ad Space
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div
          className={`cursor-pointer text-lg font-bold px-4 py-[14px] border-b-2  ${
            t == "fundraising"
              ? "border-primary text-primary"
              : "border-transparent text-black/30"
          }`}
          onClick={() => {
            router.push(`/projects?page=1&q=${q}&t=fundraising`);
          }}
        >
          Хандив өгөх
        </div>
        <div
          className={`cursor-pointer text-lg font-bold px-4 py-[14px] border-b-2 border-primary ${
            t == "grant_fundraising"
              ? "border-primary text-primary"
              : "border-transparent text-black/30"
          }`}
          onClick={() => {
            router.push(`/projects?page=1&q=${q}&t=grant_fundraising`);
          }}
        >
          Хандив авах
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-1 grid grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      </div>
      <Pagination
        pageIndex={Number(pageIndex)}
        q={q}
        t={t}
        lastPageIndex={lastPageIndex}
      />
    </div>
  );
};

const Pagination = ({
  pageIndex,
  lastPageIndex,
  q,
  t,
}: {
  pageIndex: number;
  lastPageIndex: number;
  q: string;
  t: string;
}) => {
  return (
    <div className="flex flex-row gap-2">
      {pageIndex >= 3 && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/projects",
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
            pathname: "/projects",
            query: {
              page: pageIndex - 1,
              q: q,
              t: t,
            },
          }}
        >
          {pageIndex - 1}
        </Link>
      )}
      <Link
        className=" w-8 h-8 flex items-center justify-center rounded-sm text-white bg-primary"
        href={{
          pathname: "/projects",
          query: {
            page: pageIndex,
            q: q,
            t: t,
          },
        }}
      >
        {pageIndex}
      </Link>
      {pageIndex + 1 <= lastPageIndex && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/projects",
            query: {
              page: pageIndex + 1,
              q: q,
              t: t,
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
            pathname: "/projects",
            query: {
              page: pageIndex + 2,
              q: q,
              t: t,
            },
          }}
        >
          {pageIndex + 2}
        </Link>
      )}
    </div>
  );
};

const FeaturedCarousel = ({ featured }: { featured: EventType[] }) => {
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
    <div className="flex-1 min-h-80 relative flex rounded-2xl bg-white drop-shadow">
      {featured.length !== 0 ? (
        <>
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
              index == featured.length - 1
                ? "opacity-50 bg-white/20 cursor-default"
                : "flex"
            }`}
            onClick={onRight}
          >
            <ChevronRightIcon color="white" />
          </button>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center font-semibold text-xl text-black/70">
          Онцолсон төсөл хөтөлбөр олдсонгүй
        </div>
      )}

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
