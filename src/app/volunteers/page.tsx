"use client";
import { getVolunteers, getVolunteersCountry } from "@/actions";
import { Button, MainLayout, Search, Skeleton } from "@/components";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import VolunteersMap from "@/components/home/volunteers-map";
import { UserType } from "@/types";
import axios from "axios";
import Link from "next/link";

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selectedVolunteerIndex, setSelectedVolunteerIndex] = useState(0);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [volunteersLoading, setVolunteersLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchLevel, setSearchLevel] = useState("");
  const levelLimitXp = 100;
  const [page, setPage] = useState(1);
  const selectedVolunteer = useMemo<UserType | null>(() => {
    if (volunteers.length == 0) return null;
    return volunteers[selectedVolunteerIndex];
  }, [volunteers, selectedVolunteerIndex]);
  const [
    selectedVolunteerParticipatedEvents,
    setSelectedVolunteerParticipatedEvents,
  ] = useState<any[]>([]);
  const [volunteersByCountry, setVolunteersByCountry] = useState<any>(null);
  useEffect(() => {
    const getVolunteersData = async () => {
      setVolunteersLoading(true);
      const { data, pageLast }: any = await getVolunteers("", "", 1);
      const volunteersbyCountryData = await getVolunteersCountry();
      setVolunteersByCountry(volunteersbyCountryData);
      setVolunteers(data);
      setPage(1);
      setLastPage(pageLast);
      setVolunteersLoading(false);
    };
    getVolunteersData();
  }, []);
  useEffect(() => {
    const getVolunteersSearchData = async () => {
      setVolunteersLoading(true);
      const { data, pageLast }: any = await getVolunteers(
        searchValue,
        searchLevel,
        page
      );
      setVolunteers([...volunteers, ...data]);
      setVolunteersLoading(false);
      setLastPage(pageLast);
    };
    getVolunteersSearchData();
  }, [page, searchValue, searchLevel]);
  useEffect(() => {
    const getVolunteerParticipatedEvents = async () => {
      if (!selectedVolunteer) return;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${selectedVolunteer.id}/eventUsers?state=accepted`
      );
      setSelectedVolunteerParticipatedEvents(res?.data?.["hydra:member"]);
    };
    getVolunteerParticipatedEvents();
  }, [selectedVolunteer]);
  // https://api.eejii.org/api/volunteers?search=tsolmon
  return (
    <MainLayout>
      <div className="h-[440px] relative flex items-center justify-center">
        <Image
          src={"/assets/volunteer/volunteer_hero.webp"}
          fill
          alt="VolunteerHero"
          className="object-cover absolute"
        />
        <div className="flex flex-col gap-5 z-10 text-white text-center items-center">
          <h1 className="text-3xl lg:text-5xl font-semibold">
            Eejii volunteers
          </h1>
          <h2 className="font-medium text-xl">
            Let’s create an earth full of love together
          </h2>
          <Link
            href="/auth/sign-up"
            className="bg-primary p-3 rounded-2xl text-lg font-bold tracking-wider hover:bg-[#ffc280] transition-all ripple !px-6 !text-black w-fit !bg-[#FFB15C] ripple"
          >
            Сайн дурын ажилтан болох
          </Link>
        </div>
      </div>
      <VolunteersMap
        level_1={
          volunteersByCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 1
          )?.total
        }
        level_2={
          volunteersByCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 2
          )?.total
        }
        level_3={
          volunteersByCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 3
          )?.total
        }
        level_4={
          volunteersByCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 4
          )?.total
        }
        countries={volunteersByCountry?.totalVolunteersByCountry || []}
      />
      <div className="container pb-8 md:pb-16 md:py-16 flex flex-col gap-4 md:gap-16 items-center">
        <h1 className="text-xl md:text-3xl pt-16 md:pt-0 text-black font-medium uppercase border-b-4 border-b-primary pb-4">
          МАНАЙ САЙН ДУРЫН АЖИЛЧИД
        </h1>
        <div className="flex flex-col lg:flex-row w-full gap-5">
          <div className="flex-1 bg-white rounded-2xl drop-shadow-card border p-6  h-fit">
            <div className="flex max-lg:flex-col max-lg:gap-4 lg:flex-row justify-between pb-4">
              <div className="flex flex-row items-center bg-[#F5F5F5] py-2 pl-2 pr-4 gap-2 rounded-lg">
                <Search />
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setVolunteersLoading(true);
                    setPage(1);
                    setVolunteers([]);
                    setSearchValue(e.target.value);
                  }}
                  className="flex-1 outline-none bg-transparent"
                  placeholder="Хайх"
                />
              </div>
              <select
                value={searchLevel}
                onChange={(e) => {
                  setVolunteersLoading(true);
                  setVolunteers([]);
                  setPage(1);
                  setSearchLevel(e.target.value);
                }}
                className="bg-[#F5F5F5] py-2 px-6 rounded-lg outline-none"
              >
                <option value="">Бүх Түвшин</option>
                <option value="1">Түвшин 1</option>
                <option value="2">Түвшин 2</option>
                <option value="3">Түвшин 3</option>
                <option value="4">Түвшин 4</option>
              </select>
            </div>
            <div
              className="max-h-80 lg:max-h-screen overflow-scroll"
              onScroll={(e: any) => {
                if (volunteersLoading) return;
                if (
                  e.target.scrollHeight -
                    (e.target.offsetHeight + e.target.scrollTop) <
                  100
                ) {
                  if (lastPage == page) return;
                  setVolunteersLoading(true);
                  setPage(page + 1);
                }
              }}
            >
              <table className="w-full">
                <thead>
                  <tr className="table-row">
                    <th className="text-left">Нэр</th>
                    <th className="max-lg:hidden">Cертификат</th>
                    <th>Түвшин</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer: any, index: number) => (
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
                            volunteer.images.find(
                              (img: any) => img.type == "main"
                            )?.path || "/assets/placeholder.svg"
                          }
                          alt={`VolunteerEventImage` + index}
                          height={40}
                          width={40}
                          className="max-h-10 max-w-10 object-cover"
                        />
                        <div className="max-lg:max-w-32 text-ellipsis text-nowrap overflow-hidden">
                          {volunteer.username}
                        </div>
                      </td>
                      <td className="max-lg:hidden">
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
                      <td className="">
                        <div className="flex items-center justify-center">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                  {volunteersLoading && (
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
                          <td className="max-lg:hidden">
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
                          <td className="">
                            <div className="flex items-center justify-center">
                              <Image
                                src={"/assets/placeholder.svg"}
                                alt="volunteerlevel"
                                className="object-contain"
                                height={40}
                                width={40}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className={`w-full lg:w-96 bg-white rounded-3xl drop-shadow-card border p-6 flex flex-col gap-2 h-fit ${
              !selectedVolunteer ? "opacity-0 h-9" : ""
            }`}
          >
            <div className="h-64 relative rounded-xl overflow-hidden">
              <Image
                src={
                  selectedVolunteer?.images?.[0]?.path ||
                  "/assets/placeholder.svg"
                }
                alt="selectedVolunteerImage"
                className="object-cover blur-lg"
                fill
              />
              <Image
                src={
                  selectedVolunteer?.images?.[0]?.path ||
                  "/assets/placeholder.svg"
                }
                alt="selectedVolunteerImage"
                className="object-contain"
                fill
              />
            </div>
            {selectedVolunteer ? (
              <h3 className="text-xl font-medium text-center pt-2">
                {selectedVolunteer?.username}
              </h3>
            ) : (
              <Skeleton className="h-8 rounded-lg " />
            )}

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 relative">
                <Image
                  src={
                    selectedVolunteer?.level
                      ? `/assets/volunteer/level_${selectedVolunteer?.level}.png`
                      : "/assets/placeholder.svg"
                  }
                  alt="volunteerlevel"
                  className="object-contain"
                  fill
                />
              </div>
              <div className="flex flex-col items-center gap-1 w-full px-12">
                <div className="text-md w-full text-right">
                  {Math.min(
                    Math.floor(
                      ((selectedVolunteer?.xp || 0) / levelLimitXp) * 100
                    ),
                    100
                  )}
                  %
                </div>
                <div className="w-full bg-[#ECECEC] rounded-full h-2">
                  <div
                    className="bg-[#FF9900] h-2 rounded-full"
                    style={{
                      width:
                        Math.min(
                          Math.floor(
                            ((selectedVolunteer?.xp || 0) / levelLimitXp) * 100
                          ),
                          100
                        ) + "%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            {selectedVolunteer ? (
              <p className="text-md text-black/60">{selectedVolunteer?.bio}</p>
            ) : (
              <Skeleton className="h-24 rounded-2xl" />
            )}
            {selectedVolunteerParticipatedEvents?.length !== 0 && (
              <>
                <h4 className="text-lg">Оролцсон арга хэмжээ</h4>
                {selectedVolunteerParticipatedEvents?.map((ev, i) => (
                  <div
                    className={`flex flex-row items-center gap-3 ${
                      i < selectedVolunteerParticipatedEvents.length
                        ? "border-b pb-2"
                        : ""
                    }`}
                    key={i}
                  >
                    <Image
                      src={
                        ev.event.images.find((img: any) => img.type == "main")
                          ?.path || "/assets/placeholder.svg"
                      }
                      alt={`VolunteerEventImage` + i}
                      height={40}
                      width={40}
                      className="min-h-10 object-contain"
                    />
                    <h5 className="font-semibold">{ev.event.title}</h5>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* <h1 className="text-2xl md:text-3xl pt-16 md:pt-0 text-black font-medium uppercase border-b-4 border-b-primary pb-4">
          МАНАЙ САЙН ДУРЫН АЖИЛЧИДЫН СЭТГЭГДЛЭЭС
        </h1> */}
      </div>
    </MainLayout>
  );
};

// const volunteerReviews = [
//   {
//     profileImage: "/assets/placeholder.svg",
//     username: "Удвал Энхтөр",
//     review:
//       "Олон нийтийн сүлжээнд явагдаж буй хандивын үйл ажиллагааг хараад энэ зүйлийг өөрчлөх боломж байгааг хараад маш их баярладаг, энэ хүмүүст туслах чин хүсэлтэй.",
//   },
//   {
//     profileImage: "/assets/placeholder.svg",
//     username: "Удвал Энхтөр",
//     review:
//       "Олон нийтийн сүлжээнд явагдаж буй хандивын үйл ажиллагааг хараад энэ зүйлийг өөрчлөх боломж байгааг хараад маш их баярладаг, энэ хүмүүст туслах чин хүсэлтэй.",
//   },
//   {
//     profileImage: "/assets/placeholder.svg",
//     username: "Удвал Энхтөр",
//     review:
//       "Олон нийтийн сүлжээнд явагдаж буй хандивын үйл ажиллагааг хараад энэ зүйлийг өөрчлөх боломж байгааг хараад маш их баярладаг, энэ хүмүүст туслах чин хүсэлтэй.",
//   },
//   {
//     profileImage: "/assets/placeholder.svg",
//     username: "Удвал Энхтөр",
//     review:
//       "Олон нийтийн сүлжээнд явагдаж буй хандивын үйл ажиллагааг хараад энэ зүйлийг өөрчлөх боломж байгааг хараад маш их баярладаг, энэ хүмүүст туслах чин хүсэлтэй.",
//   },
// ];

export default VolunteersPage;
