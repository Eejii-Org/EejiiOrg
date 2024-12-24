"use client";

import { useEffect, useState } from "react";
import { getEvent, getEventUsers } from "@/actions";
import { GoBack, MainLayout, ParticipateButton } from "@/components";
import { toDateString, toShortDate } from "@/utils";
import Image from "next/image";
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Tag,
  Flex,
  List,
  Avatar,
  Tooltip,
} from "antd";
import { TagOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const EventPage = ({ params }: { params: { slug: string } }) => {
  const [eventData, setEventData] = useState<any>(null);
  const [eventUsers, setEventUsers] = useState<any[]>([]);
  const [eventPartners, setEventPartners] = useState<any[]>([]);
  const [eventVolunteers, setEventVolunteers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent(params.slug);
        const users = await getEventUsers(params.slug);

        setEventData(event);
        setEventUsers(users);
        setEventPartners(
          users?.filter((user: any) => user.userType === "partner")
        );
        setEventVolunteers(
          users?.filter((user: any) => user.userType === "volunteer")
        );
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const mainImage = eventData.images.filter(
    (image) => image.type === "main"
  )[0];

  const ownerProfileImage = eventData.owner.images.filter(
    (image) => image.type === "profile"
  )[0];

  const backgroundImage = mainImage
    ? `url(${mainImage.path})`
    : "url('/assets/placeholder.svg')";

  const EventState = () => {
    if (eventData.state === "done") {
      return <Tag color="blue">Дууссан</Tag>;
    }

    return eventData.isEnabled ? (
      <Tag color="green">Нийтлэгдсэн</Tag>
    ) : (
      <Tag color="warning">Хянагдаж байна</Tag>
    );
  };

  const PartnerList = () => {
    if (!eventPartners || eventPartners?.length === 0) {
      return null; // Handle the case where there are no partners
    }

    return (
      <div>
        {eventPartners.map(({ owner }: { owner: any }, ind: number) => (
          <div className="flex flex-row gap-2 items-center" key={ind}>
            <Image
              src={owner.images?.[0]?.path || "/assets/placeholder.svg"}
              width={36}
              height={36}
              className="object-cover"
              alt="OwnerProfile"
            />
            <h3 className="text-lg font-semibold text-black/70">
              {owner.username || "Unknown User"}
            </h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="bg-[#f5f5f5] py-10">
        <div className="container">
          <Row gutter={[15, 15]}>
            <Col span={16}>
              <div className="bg-white border p-8 rounded-2xl">
                <Space className="mb-5">
                  <GoBack />
                  <div>
                    <Title level={4} className="!mb-0">
                      {eventData.title}
                    </Title>

                    <Space>
                      <Text>
                        {eventData.type === "volunteering_event"
                          ? "Сайн дурын арга хэмжээ"
                          : "Арга хэмжээ"}
                      </Text>

                      <Text>
                        {dayjs(eventData.startTime).format("(YYYY.MM.DD - ")}
                        {dayjs(eventData.endTime).format("YYYY.MM.DD)")}
                      </Text>
                    </Space>
                    <Text></Text>
                  </div>
                </Space>

                <div
                  style={{
                    backgroundImage: backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="h-[448px]"
                />

                {/* Content Categories */}
                {eventData.categories && (
                  <Flex gap="4px 4px" wrap className="mt-4">
                    <span>Ангилал: </span>
                    {eventData.categories.map((category: any, ind: number) => (
                      <Tag key={ind} icon={<TagOutlined />}>
                        {category.name}
                      </Tag>
                    ))}
                  </Flex>
                )}

                <Divider />

                {/* Content Body */}
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: eventData.description }}
                />

                {/* Content Medias */}
                {eventData.media.length !== 0 && (
                  <div className="flex flex-col gap-5 pt-8">
                    <h3 className="text-2xl font-semibold">
                      Арга хэмжээний мэдээ
                    </h3>
                    <div className="flex bg-white rounded-2xl p-4">
                      <table className="flex-1">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-3 text-left">Нийтлэгч</th>
                            <th className="pb-3 text-left">Огноо</th>
                            <th className="pb-3 text-left">Гарчиг</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventData.media.map((media: any, index: number) => (
                            <tr className="border-b" key={index}>
                              <td className="flex flex-row items-center gap-3 py-3 font-semibold">
                                <Image
                                  src={
                                    media.images[0].path ||
                                    "/assets/placeholder.svg"
                                  }
                                  width={40}
                                  height={40}
                                  alt={"User-Image"}
                                  className="object-cover"
                                />
                                {media.title}
                              </td>
                              <td className="text-md py-3">
                                {toShortDate(media.createdAt)}
                              </td>
                              <td className="text-md py-3">
                                {media.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4">
                {/* <div className="flex sm:hidden md:flex border border-primary items-center justify-center rounded-full font-semibold text-center h-min">
                  {eventData.type === "volunteering_event"
                    ? "Сайн дурын арга хэмжээ"
                    : "Арга хэмжээ"}
                </div> */}
                <div className="bg-white border p-5 rounded-2xl">
                  {eventData?.owner && (
                    <div>
                      <Divider className="!mt-2">
                        <Title level={5}>Зохион байгуулагч:</Title>
                      </Divider>
                      <Flex justify="center">
                        <Avatar
                          size={32}
                          src={
                            ownerProfileImage?.path ||
                            eventData?.owner.images?.[0]?.path ||
                            "/assets/placeholder.svg"
                          }
                        />

                        <Title level={5} className="text-center">
                          {eventData.owner.organization ||
                            eventData.owner.username}
                        </Title>
                      </Flex>
                    </div>
                  )}

                  <div className={`w-full ${eventData?.owner ? "mt-4" : ""}`}>
                    <ParticipateButton slug={params.slug} />
                  </div>
                </div>

                <List bordered className="bg-white">
                  <List.Item actions={[<EventState />]}>
                    <Typography.Text>Төлөв:</Typography.Text>
                  </List.Item>

                  <List.Item
                    actions={[
                      <Avatar.Group>
                        <Avatar src="https://d2mstmber8qwm7.cloudfront.net/uploads/18/5a/cfe32b6673fac90cf003d21ff4b7.png" />
                        <Tooltip title="Ant User" placement="top">
                          <Avatar src="https://d2mstmber8qwm7.cloudfront.net/uploads/18/5a/cfe32b6673fac90cf003d21ff4b7.png" />
                        </Tooltip>
                        <Avatar src="https://d2mstmber8qwm7.cloudfront.net/uploads/18/5a/cfe32b6673fac90cf003d21ff4b7.png" />
                      </Avatar.Group>,
                    ]}
                  >
                    <Typography.Text>Хамтрагч байгууллага:</Typography.Text>
                  </List.Item>

                  <List.Item
                    actions={[
                      `${dayjs(eventData.registrationStartTime).format(
                        "YYYY/MM/DD"
                      )} - ${dayjs(eventData.registrationEndTime).format(
                        "YYYY/MM/DD"
                      )}`,
                    ]}
                  >
                    <Typography.Text>Бүртгэлийн хугацаа:</Typography.Text>
                  </List.Item>

                  <List.Item
                    actions={[
                      `${dayjs(eventData.startTime).format(
                        "YYYY/MM/DD"
                      )} - ${dayjs(eventData.endTime).format("YYYY/MM/DD")}`,
                    ]}
                  >
                    <Typography.Text>Үргэлжлэх хугацаа:</Typography.Text>
                  </List.Item>
                </List>

                <PartnerList />
              </div>
              {/* <div className="min-h-[512px] bg-white rounded-2xl flex overflow-hidden">
                <Ad position="ad_event_detail_3x2" />
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventPage;
