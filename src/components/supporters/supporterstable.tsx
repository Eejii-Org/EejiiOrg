"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SupporterGraph } from "./supportergraph";
import { getSupporterData } from "@/actions";
import { MailIcon, PhoneIcon } from "../icons";

export const SupportersTable = ({ supporters }: { supporters: any }) => {
  const [supporterIndex, setSupporterIndex] = useState(0);
  const [supporterDetails, setSupporterDetails] = useState<any>(null);
  const getSupporterDetails = async () => {
    const res = await getSupporterData(supporters[supporterIndex].id);
    setSupporterDetails(res);
  };
  useEffect(() => {
    getSupporterDetails();
  }, [supporterIndex]);
  return (
    <div className="container md:py-16 flex flex-col gap-4 md:gap-16 items-center">
      <h1 className="text-2xl md:text-3xl pt-16 md:pt-0 text-black font-medium uppercase border-b-4 border-b-primary pb-4">
        Биднийг Дэмжигчид
      </h1>
      <div className="flex flex-col lg:flex-row w-full gap-5 mb-8">
        <div className="w-full lg:w-96 bg-white rounded-2xl drop-shadow-card border p-6 h-fit">
          <div
            className="max-h-80 lg:max-h-screen overflow-scroll"
            onScroll={(e: any) => {
              // if (volunteersLoading) return;
              // if (
              //   e.target.scrollHeight -
              //     (e.target.offsetHeight + e.target.scrollTop) <
              //   100
              // ) {
              //   if (lastPage == page) return;
              //   setVolunteersLoading(true);
              //   setPage(page + 1);
              // }
            }}
          >
            <table className="w-full">
              <thead>
                <tr className="table-row border-b">
                  <th className="text-left w-8 py-4 px-2">№</th>
                  <th className="text-left py-4 px-2">Нэр</th>
                </tr>
              </thead>
              <tbody>
                {supporters?.map((supporter: any, index: number) => (
                  <tr
                    className="table-row border-b hover:bg-[#F5F5F5] transition-colors"
                    onClick={() => {
                      setSupporterIndex(index);
                    }}
                    key={index}
                  >
                    <td className="py-4 px-2">{index + 1}.</td>
                    <td className="flex flex-row gap-2 items-center py-4">
                      <Image
                        src={
                          supporter?.images?.find(
                            (img: any) => img.type == "main"
                          )?.path || "/assets/placeholder.svg"
                        }
                        alt={`VolunteerEventImage` + index}
                        height={40}
                        width={40}
                        className="max-h-10 max-w-10 object-cover"
                      />
                      {supporter.username}
                    </td>
                  </tr>
                ))}
                {/* {volunteers.map((volunteer: any, index: number) => (
                <tr
                  className="table-row border-b hover:bg-[#F5F5F5] transition-colors"
                  onClick={() => {
                    setSelectedVolunteerIndex(index);
                  }}
                  key={index}
                >
                  <td className="flex flex-row gap-2 items-center py-4">
                    <Image
                      src={
                        volunteer.images.find((img: any) => img.type == "main")
                          ?.path || "/assets/placeholder.svg"
                      }
                      alt={`VolunteerEventImage` + index}
                      height={40}
                      width={40}
                      className="max-h-10 max-w-10 object-cover"
                    />
                    {volunteer.username}
                  </td>
                  <td className="">
                    <div className="flex flex-row gap-2 w-full items-center justify-center">
                      Certificated
                      <Image
                        src={`/assets/volunteer/badge.webp`}
                        alt="volunteerlevel"
                        className="object-contain"
                        height={20}
                        width={20}
                      />
                    </div>
                  </td>
                  <td className="flex items-center justify-center">
                    <Image
                      src={
                        selectedVolunteer?.level
                          ? `/assets/volunteer/level_${selectedVolunteer?.level}.png`
                          : "/assets/placeholder.svg"
                      }
                      alt="volunteerlevel"
                      className="object-contain"
                      height={40}
                      width={40}
                    />
                  </td>
                </tr>
              ))} */}
                {/* {volunteersLoading && (
                <>
                  {new Array(10).fill(null).map((_: any, index: number) => (
                    <tr
                      className="table-row border-b hover:bg-[#F5F5F5] transition-colors"
                      key={"loading" + index}
                    >
                      <td className="flex flex-row gap-2 items-center py-4">
                        <Image
                          src={"/assets/placeholder.svg"}
                          alt={`VolunteerEventImage` + index}
                          height={40}
                          width={40}
                          className="max-h-10 max-w-10 object-cover"
                        />
                        <Skeleton className="w-24 h-5 rounded-md" />
                      </td>
                      <td className="">
                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                          Certificated
                          <Image
                            src={`/assets/volunteer/badge.webp`}
                            alt="volunteerlevel"
                            className="object-contain"
                            height={20}
                            width={20}
                          />
                        </div>
                      </td>
                      <td className="flex items-center justify-center">
                        <Image
                          src={"/assets/placeholder.svg"}
                          alt="volunteerlevel"
                          className="object-contain"
                          height={40}
                          width={40}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )} */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl drop-shadow-card border p-6 h-fit">
          <div>
            <div className="flex flex-col lg:flex-row">
              <div className="min-w-36 h-36 lg:min-w-80 lg:h-60 relative">
                <Image
                  fill
                  src={
                    supporters[supporterIndex]?.images.find(
                      (img: any) => img.type == "main"
                    ).path || "/assets/placeholder.svg"
                  }
                  alt="profile"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-xl lg:text-2xl">
                  {supporters[supporterIndex]?.username}
                </h1>
                <div
                  className="text-md lg:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: supporters[supporterIndex]?.bio,
                  }}
                />
                <div className="flex flex-row gap-4 text-black/70 text-sm lg:text-lg font-medium">
                  {supporters[supporterIndex]?.phoneNumber && (
                    <a
                      className="flex flex-row items-center gap-2"
                      href={`tel: ${supporters[supporterIndex]?.phoneNumber}`}
                    >
                      <PhoneIcon color="#555555" />
                      {supporters[supporterIndex]?.phoneNumber}
                    </a>
                  )}
                  {supporters[supporterIndex]?.phoneNumber &&
                    supporters[supporterIndex]?.email &&
                    "|"}
                  {supporters[supporterIndex]?.email && (
                    <a
                      className="flex flex-row items-center gap-2"
                      href={`mailto: ${supporters[supporterIndex]?.email}`}
                    >
                      <MailIcon color="#555555" />
                      {supporters[supporterIndex]?.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {supporterDetails && (
            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 py-4">
              {Object.keys(supporterDetails).map((k) => (
                <div
                  className="flex flex-1 items-center justify-center gap-1 border py-2 md:py-4 rounded-xl capitalize text-sm lg:text-lg"
                  key={k}
                >
                  {k}:<div>{(supporterDetails[k] as any[]).length}</div>
                </div>
              ))}
            </div>
          )}
          {supporterDetails &&
            supporterDetails?.donations.length +
              supporterDetails?.events.length +
              supporterDetails?.media.length +
              supporterDetails?.projects.length !==
              0 && <SupporterGraph supporterDetails={supporterDetails} />}
        </div>
      </div>
    </div>
  );
};
