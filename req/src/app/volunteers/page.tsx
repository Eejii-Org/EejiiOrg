"use client";
import { getVolunteers, getVolunteersCountry } from "@/actions";
import { MainLayout } from "@/components";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import VolunteersMap from "@/components/home/volunteers-map";
import { UserType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { Button, Space, Typography, Row, Col, Input, Select, Flex } from "antd";

const { Text, Title } = Typography;

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

  console.log(
    "selectedVolunteerParticipatedEvents",
    selectedVolunteerParticipatedEvents
  );

  const handleLoadMore = () => {
    if (lastPage == page) return;
    setVolunteersLoading(true);
    setPage(page + 1);
  };
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
        <Title level={2}>Манай сайн дурын ажилчид</Title>

        <div className="drop-shadow-card">
          <Row gutter={15} className="mb-4">
            <Col span={18}>
              <Input
                size="large"
                style={{ width: "100%" }}
                placeholder="Хайх"
                onChange={(e) => {
                  setVolunteersLoading(true);
                  setPage(1);
                  setVolunteers([]);
                  setSearchValue(e.target.value);
                }}
              />
            </Col>

            <Col span={6}>
              <Select
                size="large"
                defaultValue=""
                style={{ width: "100%" }}
                onChange={(val) => {
                  setVolunteersLoading(true);
                  setVolunteers([]);
                  setPage(1);
                  setSearchLevel(val);
                }}
                options={[
                  { value: "", label: "Бүх Түвшин" },
                  { value: "1", label: "Түвшин 1" },
                  { value: "2", label: "Түвшин 2" },
                  { value: "3", label: "Түвшин 3" },
                  { value: "4", label: "Түвшин 4" },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {volunteers.map((item, idx) => (
              <Col span={6} key={idx}>
                <Link href={`/public/volunteer/${item.id}`}>
                  <div className="border bg-white rounded-md p-3">
                    <Space>
                      <Image
                        src={
                          item.images.find((img: any) => img.type == "main")
                            ?.path || "/assets/placeholder.svg"
                        }
                        height={80}
                        width={80}
                        className="max-h-16 max-w-16 object-cover rounded-md"
                      />
                      <div>
                        <Title level={5} style={{ marginBottom: 0 }}>
                          {item.firstName}
                        </Title>
                        <Text type="secondary" className="block">
                          {item.lastName}
                        </Text>
                        <Text type="secondary" className="block">
                          level: {item.level}
                        </Text>
                      </div>
                    </Space>

                    <Image
                      src={
                        selectedVolunteer?.level
                          ? `/assets/volunteer/level_${selectedVolunteer?.level}.png`
                          : "/assets/placeholder.svg"
                      }
                      alt="volunteerlevel"
                      height={40}
                      width={40}
                      className="float-right"
                    />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        <Flex justify="space-around" className="container bg-white rounded-md">
          <Button
            onClick={handleLoadMore}
            loading={volunteersLoading}
            type="primary"
          >
            Цааш үзэх
          </Button>
        </Flex>
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
