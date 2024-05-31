// "use client";
// import type { Media } from '@/lib/types';
// import { format } from 'date-fns';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MainLayout, Skeleton } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

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
      <Image
        // src={image}
        src={"/assets/home/backGroundImg.png"}
        width={1200}
        height={329}
        className="md:rounded-[20px] w-full h-[329px] object-cover"
        alt="Media Background IMG"
      />
      <div className="w-full mx-auto mb-24">
        <div className="container px-10 py-7 sm:px-[64px] sm:py-[48px] bg-white relative mx-auto shadow-sm rounded-2xl md:max-w-[800px] xs:-mt-28 md:-mt-44">
          {data ? (
            <>
              <header className="flex flex-col gap-1 mb-6">
                <h5 className="font-bold text-lg md:text-[30px] mb-2">
                  {data?.title}
                </h5>
                <div className="flex items-center gap-2 justify-between">
                  {data?.owner && (
                    <div className="flex gap-2">
                      <Image
                        width={25}
                        height={25}
                        src={"/images/volunteer/volunteer_logo.png"}
                        alt="publisher's avatar"
                      />
                      <p className="font-semibold text-xl text-black/60">
                        {/* {media.Owner.organizationName ?? media.Owner.email} */}
                        Тэмүүжин
                      </p>
                    </div>
                  )}

                  <p className="text-lg text-black/50">
                    {/* Published at{' '}
              {format(media.createdAt as unknown as Date, 'LLL do yyyy, H:mm')} */}
                    {new Date(data?.createdAt).toDateString()}
                  </p>
                </div>
              </header>
              <p
                className=" text-[18px] mb-9"
                dangerouslySetInnerHTML={{ __html: data?.body }}
              />
              <div className="">
                <Link className="flex gap-2" href={"/media"}>
                  <ArrowLeft color="black" /> Буцах
                </Link>
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
