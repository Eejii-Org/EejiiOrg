// Media | Event | Project | Fundraise

import Image from "next/image";
import { Skeleton } from "./skeleton";
import { formatPrice, toDateString } from "@/utils";
import Link from "next/link";
import { ArrowRight } from "./icons";

interface CardPropsType {
  cardType: "event" | "media" | "project";
  cardSize?: "small" | "base" | "large";
  contain?: boolean;
  categoryVisible?: boolean;
  cardData?: any;
  loading?: boolean;
  showHighlight?: boolean;
  highlightColor?: string;
}

export const Card = (props: CardPropsType) => {
  const {
    cardType,
    cardSize = "base",
    contain = false,
    categoryVisible = false,
    loading = false,
    showHighlight = false,
    highlightColor = "#FFE787",
  } = props;
  const { cardData } = props;
  return (
    <div
      className={`flex-1 w-full flex flex-row gap-6 ${
        contain ? "bg-white rounded-[24px]" : ""
      }`}
    >
      {showHighlight && (
        <div className={`w-1 mt-24`} style={{ background: highlightColor }} />
      )}
      <div className="flex-1 flex flex-col gap-2">
        {loading ? (
          <Skeleton
            className={`flex-1 rounded-2xl ${
              cardSize == "base"
                ? "min-h-52"
                : cardType == "event"
                ? "min-h-40"
                : "min-h-64"
            }`}
          />
        ) : (
          <div
            className={`relative flex-1 w-full rounded-2xl ${
              showHighlight ? "shadow-primary/20 shadow drop-shadow" : ""
            } overflow-hidden ${
              cardSize == "base"
                ? "min-h-52"
                : cardType == "event"
                ? "min-h-40"
                : "min-h-64"
            }`}
          >
            <Image
              src={
                cardData?.Images?.[0]?.path
                  ? process.env.NEXT_PUBLIC_AWS_PATH +
                    "/" +
                    cardData?.Images?.[0]?.path
                  : "/assets/placeholder.svg"
              }
              fill
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  "/assets/placeholder.svg";
              }}
              className="object-cover"
              alt={"Card" + cardData?.id}
            />
          </div>
        )}
        <div
          className={`flex flex-col flex-1 gap-2 ${contain ? "px-4 pb-4" : ""}`}
        >
          {categoryVisible && (
            <>
              {loading ? (
                <Skeleton className="h-6 w-24 mt-2 rounded" />
              ) : (
                <div className="pt-2">
                  <span className="px-6 py-1 bg-primary/20 text-primary font-bold rounded-full capitalize">
                    {cardData?.Categories?.[0]?.name || ""}
                  </span>
                </div>
              )}
            </>
          )}
          {cardType == "media" && (
            <>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded" />
              ) : (
                <div className="">
                  <span className="px-2 py-1 bg-black/10 text-black/50 font-medium text-md rounded-full">
                    {toDateString(cardData?.createdAt)}
                  </span>
                </div>
              )}
            </>
          )}
          {loading ? (
            <>
              <Skeleton className="h-6 rounded" />
              <Skeleton className="h-32 rounded" />
            </>
          ) : (
            <>
              <h3 className="font-semibold text-base pt-5 md:pt-0 max-line-2">
                {cardData?.title}
              </h3>
              {cardType !== "media" && (
                <p className="text-lg md:text-md text-black/60 min-h-24">
                  {cardData?.["description"]?.split(" ").slice(0, 30).join(" ")}
                </p>
              )}
            </>
          )}
          {cardType == "media" && (
            <>
              {loading ? (
                <></>
              ) : (
                <div className="w-full flex items-start">
                  <Link
                    href={`/media/${cardData?.["@id"]
                      .split("/")
                      .slice(3)
                      .join("/")}`}
                    className=" text-primary font-medium text-lg flex justify-center items-center gap-2"
                  >
                    Унших
                    <ArrowRight />
                  </Link>
                </div>
              )}
            </>
          )}
          {cardType == "project" && cardSize !== "small" && (
            <>
              {loading ? (
                <Skeleton className="h-11 rounded" />
              ) : (
                <div className="flex-1 flex flex-col justify-end">
                  <div>
                    <div className="flex flex-row items-center gap-1">
                      <div className="w-full bg-[#ECECEC] rounded-full h-[5px]">
                        <div
                          className="bg-[#FF9900] h-[5px] rounded-full"
                          style={{
                            width:
                              Math.min(
                                Math.floor(
                                  (cardData.currentAmount /
                                    cardData.goalAmount) *
                                    100
                                ),
                                100
                              ) + "%",
                          }}
                        ></div>
                      </div>
                      <span className="text-md">
                        {Math.min(
                          Math.floor(
                            (cardData.currentAmount / cardData.goalAmount) * 100
                          ),
                          100
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex flex-row justify-between text-md">
                      <div className="text-black/60">
                        Цугласан:{" "}
                        <span className=" text-[#FF9900]">
                          {formatPrice(cardData.currentAmount ?? 0, "MNT")}
                        </span>
                      </div>
                      <div className="text-black/60">
                        Зорилго:{" "}
                        <span className=" text-primary">
                          {formatPrice(cardData.goalAmount ?? 0, "MNT")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {cardSize == "large" && (
                    <button className="bg-primary py-2 mt-2 rounded-[8px] text-white font-bold text-[18px] w-full">
                      Хандив өгөх
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
