"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "../card";
import { Search } from "../icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const MediaSearch = ({
  medias,
  lastPageIndex,
  pageIndex,
  q,
}: {
  medias: any[];
  lastPageIndex: number;
  pageIndex: number;
  q: string;
}) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      router.push(`/medias?page=1&q=${searchInput}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 md:mb-8 mx-3 px-4 py-5 md:py-5 md:px-6 bg-white shadow-md rounded-full">
        <input
          className="w-full outline-none text-lg"
          placeholder="Хайх"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Search />
      </div>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  gap-y-12">
        {medias.length == 0 && <p> Хайлт олдсонгүй</p>}
        {medias.map((media, index) => (
          <div key={index} className="flex">
            <Card cardType="media" cardData={media} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center pt-6">
        <Pagination q={q} pageIndex={pageIndex} lastPageIndex={lastPageIndex} />
      </div>
    </div>
  );
};

const Pagination = ({
  pageIndex,
  lastPageIndex,
  q,
}: {
  pageIndex: number;
  lastPageIndex: number;
  q: string;
}) => {
  return (
    <div className="flex flex-row gap-2">
      {pageIndex >= 3 && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/medias",
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
            pathname: "/medias",
            query: {
              page: pageIndex - 1,
              q: q,
            },
          }}
        >
          {pageIndex - 1}
        </Link>
      )}
      <Link
        className=" w-8 h-8 flex items-center justify-center rounded-sm text-white bg-primary"
        href={{
          pathname: "/medias",
          query: {
            page: pageIndex,
            q: q,
          },
        }}
      >
        {pageIndex}
      </Link>
      {pageIndex + 1 <= lastPageIndex && (
        <Link
          className=" w-8 h-8 flex items-center justify-center rounded-sm text-secondary"
          href={{
            pathname: "/medias",
            query: {
              page: pageIndex + 1,
              q: q,
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
            pathname: "/medias",
            query: {
              page: pageIndex + 2,
              q: q,
            },
          }}
        >
          {pageIndex + 2}
        </Link>
      )}
    </div>
  );
};
