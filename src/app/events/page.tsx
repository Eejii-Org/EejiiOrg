"use client";
import { useState, useEffect } from "react";
import { api } from "@/actions";
import { MainLayout, FeaturedSlider } from "@/components";
import { EventType } from "@/types";
import {
  Typography,
  Row,
  Col,
  Input,
  Select,
  Space,
  Button,
  Card,
  Avatar,
  Tooltip,
  Tag,
  Radio,
  Flex,
  message,
  Divider,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UsergroupAddOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Meta } = Card;
const { Search } = Input;
const options = [
  { label: "Бүгд", value: null },
  { label: "Арга хэмжээ", value: "event" },
  { label: "Сайн дурын ажил", value: "volunteering_event" },
];

const EventsPage = ({ searchParams }) => {
  // Default parameters from URL search
  const { type = "", search = "", category = "", limit = 12 } = searchParams;
  const router = useRouter();

  // States for fetched data
  const [events, setEvents] = useState<EventType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [eventloading, setEventLoading] = useState(true);

  // Fetch events data based on filters
  const fetchEvent = async () => {
    const qType = type && `&type=${type}`;
    const qCat = category && `&categories.slug=${category}`;
    const result = await api.get(
      `/api/events?isEnabled=true&limit=${limit}&order[startTime]=desc${qType}${qCat}`
    );

    if (!result.success) {
      return message.warning(result.message.message);
    }

    setEvents(result?.data?.["hydra:member"] || []);
    setEventLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const result = await api.get("/api/categories");

    if (!result.success) {
      return message.warning(result.message.message);
    }

    setCategories(result?.data?.["hydra:member"] || []);
  };

  // Fetch featured Event
  const fetchFeatured = async () => {
    const result = await api.get(
      "/api/events?isEnabled=true&order[approved_at]=desc&limit=3&isFeatured=true"
    );

    if (!result.success) {
      return message.warning(result.message.message);
    }

    console.log("result", result);

    setFeatured(result?.data?.["hydra:member"] || []);
  };

  console.log("fraetured", featured);

  // Load initial data on page load or filter change
  useEffect(() => {
    setEventLoading(true);
    fetchEvent();
    fetchCategories();
    fetchFeatured();
  }, [type, search, category, limit]);

  // Handle changing type filter
  const handleChangeType = (e) => {
    const value = e.target.value;
    const currentParams = new URLSearchParams(window.location.search);

    setEventLoading(true);
    if (!value) {
      currentParams.delete("type");
    } else {
      currentParams.set("type", value);
    }
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  // Handle category selection
  const handleSelectCategory = (value) => {
    const currentParams = new URLSearchParams(window.location.search);
    setEventLoading(true);

    if (!value) {
      currentParams.delete("category.slug");
    } else {
      currentParams.set("category.slug", value);
    }
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  // Handle loading more events
  const handleLoadMore = () => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentLimit = parseInt(currentParams.get("limit") || "12", 10);
    currentParams.set("limit", currentLimit + 12);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  // Render event list
  const RenderList = () => {
    return (
      <Row gutter={[20, 15]} className="mt-6">
        {events.map((item) => (
          <Col span={16} key={item.id} offset={3}>
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <Row gutter={[15, 15]}>
                <Col span={10}>
                  <Link href={"/events/" + item.slug}>
                    <img
                      alt="example"
                      src={item.images[0]?.path || "/assets/placeholder.svg"}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,

                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </Col>
                <Col span={14}>
                  <div className="py-8 px-6">
                    <Link href={"/events/" + item.slug}>
                      <Title level={4}>{item.title}</Title>
                    </Link>
                    {console.log("itemaaaaaaaaaaaaaaaaaa", item)}
                    Eum reprehenderit eligendi magnam amet, quae, obcaecati
                    voluptas repellat, sit illo necessitatibus qui cumque fugit
                    rem ab? Eum reprehenderit eligendi magnam amet, quae,
                    obcaecati voluptas repellat, sit illo necessitatibus qui
                    cumque fugit rem ab?
                    {item?.shortDescription}
                    <Divider style={{ margin: "12px 0" }} />
                    <Space>
                      <Text type="secondary">
                        <Space>
                          <div>Хүний тоо:</div>
                          <Tag color="orange">
                            {item?.maxVolunteers ? item?.maxVolunteers : "NA"}
                          </Tag>
                        </Space>
                      </Text>

                      <Text type="secondary">
                        <Space size="small">
                          <div>Бүртгэл хаагдах:</div>
                          <Tag color="orange">
                            {dayjs(item?.endTime).format("YYYY.MM.DD")}
                          </Tag>
                        </Space>
                      </Text>

                      <Text type="secondary">
                        <Space>
                          <div>Хамтагч:</div>
                          <Avatar src={item?.images[0]?.path} />
                        </Space>
                      </Text>
                    </Space>
                  </div>
                </Col>
              </Row>
            </div>

            {/* <Card
              cover={
                <Link href={"/events/" + item.slug}>
                  <img
                    alt="example"
                    src={item.images[0]?.path || "/assets/placeholder.svg"}
                    style={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                </Link>
              }
              className="shadow-sm"
              actions={[
                <Space key="volunteers">
                  <UsergroupAddOutlined />
                  {item?.maxVolunteers}
                </Space>,
                <div key="date">
                  {dayjs(item?.endTime).format("YYYY.MM.DD")}
                </div>,
              ]}
            >
              <Meta
                avatar={
                  <Tooltip title={item?.owner?.organization}>
                    <Avatar src={item?.images[0]?.path} />
                  </Tooltip>
                }
                title={item.title}
                description={
                  <div style={{ minHeight: "48px", overflow: "hidden" }}>
                    {item?.shortDescription?.length > 100
                      ? `${item?.shortDescription.slice(0, 50)}...`
                      : item?.shortDescription}
                  </div>
                }
              />
            </Card> */}
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <MainLayout>
      {/* <FeaturedSlider featured={featured} /> */}

      <div className="bg-[#f5f5f5] pt-8">
        <div className="container">
          <Row gutter={[20, 15]} className="mt-6">
            <Col span={12} offset={3}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={4}>Арга хэмжээнүүд</Title>

                <div className="flex justify-between">
                  <Radio.Group
                    options={options}
                    defaultValue={null}
                    optionType="button"
                    buttonStyle="solid"
                    onChange={handleChangeType}
                  />

                  <Space>
                    <Search placeholder="Search..." />
                    <Select
                      allowClear
                      style={{ width: 220 }}
                      placeholder="Ангилал сонгох"
                      onChange={handleSelectCategory}
                      options={categories.map((item) => ({
                        label: item.name,
                        value: item.slug,
                      }))}
                    />
                  </Space>
                </div>
              </Space>
            </Col>
          </Row>
          {eventloading ? (
            <Row gutter={[20, 15]} className="mt-6">
              <Col span={12} offset={6}>
                <Card loading={true} />
              </Col>
            </Row>
          ) : (
            <RenderList />
          )}

          <Flex justify="center" className="py-10">
            <Button onClick={handleLoadMore} type="primary">
              Цааш үзэх
            </Button>
          </Flex>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
