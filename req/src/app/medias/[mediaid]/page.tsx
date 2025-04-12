// "use client";
// import type { Media } from '@/lib/types';
// import { format } from 'date-fns';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GoBack, MainLayout, Skeleton } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";
import { toDateString } from "@/utils";

// media-гаа авахгүй байсан тул гараар content орууллаа.

const MediaPage = async (props: any) => {
  const mediaId = props.params?.["mediaid"];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/${mediaId}`
  );
  // const [data, setData] = useState<any>(null);
  // useEffect(() => {
  //   const getMedia = async () => {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/${mediaId}`
  //     );
  //     setData(res.data);
  //   };
  //   getMedia();
  // }, [mediaId]);
  // const image =
  //   process.env.NEXT_PUBLIC_AWS_PATH + '/' + media?.Images?.[0]?.path;
  return (
    <MainLayout>
      <div className="relative overflow-hidden md:rounded-[20px] w-full h-36 md:h-[329px]">
        <Image
          src={"/assets/home/backGroundImg.png"}
          alt="Media Background IMG"
          className="object-cover"
          fill
        />
      </div>

      <div className="w-full mx-auto mb-24">
        <div className="container px-3 md:px-10 py-7 sm:px-[64px] sm:py-[48px] bg-white relative mx-auto shadow-sm rounded-2xl xl:max-w-[800px] 2xl:max-w-[1096px] xs:-mt-28 md:-mt-44">
          {data ? (
            <>
              <header className="flex flex-col gap-1 mb-6">
                <h5 className="font-bold text-lg md:text-[30px] leading-tight mb-2">
                  {data?.title}
                </h5>
                <div className="flex gap-2 flex-col">
                  {data.owner && (
                    <div className="flex gap-2">
                      <Image
                        width={25}
                        height={25}
                        src={
                          data.owner.images?.[0]?.path ||
                          "/assets/placeholder.svg"
                        }
                        alt="publisher's avatar"
                      />
                      <p className="font-medium text-lg text-black/60">
                        {/* {media.Owner.organizationName ?? media.Owner.email} */}
                        {data.owner.username}
                      </p>
                    </div>
                  )}

                  <p className="text-lg text-black/50">
                    {/* Published at{' '}
              {format(media.createdAt as unknown as Date, 'LLL do yyyy, H:mm')} */}
                    {toDateString(data?.createdAt)}
                  </p>
                </div>
              </header>
              <p
                className="text-md md:text-[18px] leading-normal break-words mb-9"
                dangerouslySetInnerHTML={{ __html: data?.body }}
              />
              <div className="">
                <GoBack>Буцах</GoBack>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-28" />
              <Skeleton className=" w-32 h-6" />
              <Skeleton className=" w-full h-[640px]" />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MediaPage;
