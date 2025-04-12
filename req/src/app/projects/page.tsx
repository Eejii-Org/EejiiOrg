"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  getFeaturedProjects,
  getProjects,
  api,
} from "@/actions";
import { MainLayout, FeaturedSlider } from "@/components";
import { ProjectBody } from "@/components/projects";
import { EventType } from "@/types";
import Image from "next/image";
import {
  message,
  Space,
  Typography,
  Radio,
  Input,
  Select,
  Row,
  Col,
  Card,
  Tooltip,
  Avatar,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UsergroupAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Search } = Input;
const { Title } = Typography;
const { Meta } = Card;

const options = [
  { label: "Бүгд", value: null },
  { label: "Хандив өгөх", value: "event" },
  { label: "Хандив авах", value: "volunteering_event" },
];

const ProjectPage = ({
  searchParams,
}: {
  searchParams: {
    page: number;
    q: string;
    t: "fundraising" | "grant_fundraising";
    category: string;
  };
}) => {
  const { page = 1, q = "", t = "fundraising", category = "" } = searchParams;
  const [project, setProject] = useState([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<EventType[]>([]);
  const [categories, setCategories] = useState([]);
  const [lastPageIndex, setLastPageIndex] = useState<number | undefined>();
  const [projectloading, setProjectLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: eventsData } = await getProjects(page, q, t, category);
  //       const { data: featuredProjectsData } = await getFeaturedProjects();
  //       const categoriesData = await getCategories();

  //       setEvents(eventsData?.["hydra:member"] || []);
  //       setCategories(categoriesData || []);
  //       setLastPageIndex(eventsData?.["hydra:meta"].pagination.last);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [page, q, t, category]);

  // Fetch projects data based on filters
  const fetchProject = async () => {
    // const qType = type && `&type=${type}`;
    // const qCat = category && `&categories.slug=${category}`;
    const result = await api.get(
      `/api/projects?state=new&isEnabled=true&order[startTime]=asc&&limit=12`
    );

    if (!result.success) {
      return message.warning(result.message.message);
    }

    setProject(result?.data?.["hydra:member"] || []);
    setProjectLoading(false);
  };

  // Fetch featured Event
  const fetchFeatured = async () => {
    const result = await api.get(
      `/api/projects?state=new&isEnabled=true&order[startTime]=asc&type=${t}&limit=12`
    );

    if (!result.success) {
      return message.warning(result.message.message);
    }

    console.log("result", result);

    setFeaturedProjects(result?.data?.["hydra:member"] || []);
  };

  console.log("project", project);

  // ${
  //   process.env.NEXT_PUBLIC_BACKEND_URL
  // }/api/projects?state=new&isEnabled=true&order[startTime]=asc&type=${t}&limit=12&page=${page}${
  //   q ? "&title=" + q : ""
  // }${category ? "&categories.slug=" + category : ""}

  useEffect(() => {
    fetchProject();
    fetchFeatured();
  }, [page, q, t, category]);

  // Render event list
  const RenderList = () => {
    return (
      <Row gutter={[20, 15]} className="mt-6">
        {project.map((item) => (
          <Col span={6} key={item.id}>
            <Card
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
                  <div
                    style={{ minHeight: "48px", overflow: "hidden" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.shortDescription?.length > 100
                          ? `${item?.shortDescription.slice(0, 50)}...`
                          : item?.shortDescription,
                    }}
                  ></div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <MainLayout>
      <FeaturedSlider featured={featuredProjects} />

      <div className="bg-[#f5f5f5] pt-8">
        <div className="container">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={3}>Төсөл хөтөлбөрүүд</Title>

            <div className="flex justify-between">
              <Radio.Group
                options={options}
                defaultValue={null}
                optionType="button"
                buttonStyle="solid"
                // onChange={handleChangeType}
              />

              <Space>
                <Search placeholder="Search..." />
                <Select
                  allowClear
                  style={{ width: 220 }}
                  placeholder="Ангилал сонгох"
                />
              </Space>
            </div>
          </Space>

          {projectloading ? (
            <Row gutter={[20, 15]} className="mt-6">
              <Col span={6}>
                <Card loading={true} />
              </Col>
              <Col span={6}>
                <Card loading={true} />
              </Col>
              <Col span={6}>
                <Card loading={true} />
              </Col>
              <Col span={6}>
                <Card loading={true} />
              </Col>
            </Row>
          ) : (
            <RenderList />
          )}
        </div>
      </div>

      {/* <div className="container max-md:mt-5 pb-[40px] md:py-[60px]">
        <div className="flex max-md:flex-col gap-5 md:gap-9">
          <div className="absolute top-0 left-0 h-48 md:h-80 w-screen">
            <Image
              src="/assets/event/banner.webp"
              fill
              alt="event-banner"
              className="object-cover"
            />
          </div>
          <ProjectBody
            pageIndex={page}
            lastPageIndex={lastPageIndex}
            projects={events}
            categories={categories}
            featuredProjects={featuredProjects}
            t={t}
            q={q}
            category={category}
          />
        </div>
      </div> */}
    </MainLayout>
  );
};

export default ProjectPage;
