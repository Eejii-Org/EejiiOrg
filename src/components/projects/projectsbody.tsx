"use client";
import Link from "next/link";
import { EventType } from "@/types";
import { ProjectCard } from "./projectcard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "../icons";
import Image from "next/image";
import { Button } from "../button";
import { Ad } from "../ad";

export const ProjectBody = ({
  lastPageIndex,
  projects,
  pageIndex,
  categories,
  featuredProjects,
  t,
  q,
  category,
}: {
  lastPageIndex: number;
  projects: any[];
  pageIndex: number;
  featuredProjects: any[];
  categories: any[];
  t: string;
  q: string;
  category: string;
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search == "" && q == "") {
        return;
      }
      router.push(
        `/projects?page=1&t=${t}&categories.slug=${category}&q=${search}`
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <div className="flex flex-1 w-full flex-col items-center gap-8 z-10 mt-20 md:mt-36">
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col gap-6 w-full">
          {/* Projects Search */}
          <div className="flex flex-col p-4 md:p-6 bg-white w-full gap-6 drop-shadow rounded-2xl">
            <h1 className="tex-xl md:text-2xl font-semibold">
              Та ямар төсөл дэмжихийг хүсч байна вэ?
            </h1>
            <div className="flex flex-row gap-6 flex-1">
              <div className="flex-1 flex justify-between px-4 py-3 md:py-5 md:px-6 bg-white rounded-full border">
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
        <div className="min-w-80 bg-white rounded-2xl hidden overflow-hidden md:flex">
          <Ad position="ad_project_list_3x2" />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 md:flex-row w-full justify-between">
        <div className="flex flex-row">
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
        <div>
          <select
            className="border border-[#FCF0DE] rounded-full max-w-[142px] overflow-hidden overflow-ellipsis py-2 px-4 text-center text-black/50 appearance-none"
            onChange={(e) => {
              router.push(
                `/projects?page=1&q=${q}&t=${t}&category=${e.target.value}`
              );
            }}
          >
            <option value={""}>Бүх Ангилал</option>
            {categories?.map((category, index) => (
              <option value={category.slug} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <h3 className="relative z-10 font-medium text-md md:text-xl text-white text-center">
            {event.owner.username}
          </h3>
          <h2 className="relative z-10 font-medium text-xl md:text-3xl text-white text-center">
            {event.title}
          </h2>
          <Link
            className=" bg-primary text-white text-lg font-bold tracking-wider hover:bg-[#8AB8BB] transition-all relative mt-8 py-3 md:!py-4 !px-6 rounded"
            href={"/projects/" + event.slug}
          >
            Хандив өгөх
          </Link>
        </div>
      ))}
    </div>
  );
};
