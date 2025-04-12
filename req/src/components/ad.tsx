"use client";
import { getAdvertisement } from "@/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

export type BannerPositionType =
  | "ad_media_1x1"
  | "ad_media_1x1_bottom"
  | "ad_media_1x4"
  | "ad_event_list_3x2"
  | "ad_event_detail_3x2"
  | "ad_project_list_3x2"
  | "ad_project_detail_3x2"
  | "ad_,edoa_3x1";

export const Ad = ({ position }: { position: BannerPositionType }) => {
  const [adData, setAdData] = useState<any>(null);
  useEffect(() => {
    const getAd = async () => {
      const ad = await getAdvertisement(position);
      setAdData(ad && ad[0]);
    };
    getAd();
  }, [position]);
  return (
    <div className="flex-1 flex relative ">
      {adData && (
        <>
          <Image
            src={adData.desktopPath}
            fill
            alt={position}
            className="object-cover blur"
          />
          <Image
            src={adData.desktopPath}
            fill
            alt={position}
            className="object-contain"
          />
        </>
      )}
    </div>
  );
};
