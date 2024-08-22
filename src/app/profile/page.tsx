"use client";
import { MainLayout } from "@/components";
import { useAuth } from "@/providers";
import { toDateString } from "@/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { myEvents, getCertificate } from "@/actions";
import dayjs from "dayjs";

import {
  PictureOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CloudDownloadOutlined,
  FilePdfOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Tabs,
  Divider,
  Typography,
  Avatar,
  Button,
  Tag,
  Tooltip,
  Space,
  Table,
  Flex,
} from "antd";

const { Text, Title } = Typography;

// certification columns

const certColumns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Санаачлагч",
    key: "organizationName",
    dataIndex: "organizationName",
  },
  {
    title: "Нэр",
    key: "title",
    render: (text, record) => record.event.title,
  },
  {
    title: "Оноо",
    dataIndex: "grade",
    key: "grade",
    render: (text, record) => <Tag color="green">+{text}</Tag>,
  },

  {
    title: "Үргэлжлэх хугацаа",
    key: "dateRange",
    render: (text, record) => {
      const startDate = dayjs(record.event.startTime);
      const endDate = dayjs(record.event.endTime);

      return (
        <div>
          {startDate.format("YYYY/MM/DD")} - {endDate.format("YYYY/MM/DD")}
        </div>
      );
    },
  },
  {
    title: "Зарцуулсан цаг",
    dataIndex: "volunteeringHours",
    key: "volunteeringHours",
    render: (text, record) => {
      const hours = record.event.volunteeringHours;
      if (!hours) return "N/A";

      return record.event.volunteeringHours;
    },
  },
  {
    title: "Батламж",
    dataIndex: "",
    key: "download",
    render: (text, record) => (
      <Link
        href={`/profile/certification/${record.template.id}`}
        target="_blank"
      >
        <Button icon={<CloudDownloadOutlined />} type="primary" size="small">
          татах
        </Button>
      </Link>
    ),
  },
];

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await getCertificate(token);

      if (result?.["hydra:member"] as any) {
        setCertificateData(result?.["hydra:member"]);
      }
    };

    fetchCertificateData();
  }, [user]);

  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/auth");
  }

  const tabItems = [
    {
      key: "2",
      label: (
        <Space>
          <FilePdfOutlined /> Миний арга хэмжээнүүд
        </Space>
      ),
      children: (
        <Table
          bordered
          dataSource={certificateData}
          columns={certColumns}
          className="bg-white p-4 rounded-b-md -mt-4"
        />
      ),
    },
    {
      key: "3",
      label: (
        <Space>
          <FilePdfOutlined /> Тодорхойлолт
        </Space>
      ),
      children: <Table className="bg-white p-4 rounded-b-md -mt-4" />,
    },
    {
      key: "4",
      label: (
        <Space>
          <DollarOutlined /> Хандив
        </Space>
      ),
      children: (
        <div>
          <Table className="bg-white p-4 rounded-b-md -mt-4" />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <div
          className="w-full rounded-t-md h-72 relative"
          style={{
            background: "url(/assets/profile/profile-bg.jpg)",
            backgroundSize: "cover",
          }}
        >
          <Tooltip title="Зураг шинчлэх" placement="left">
            <Button
              ghost
              className="absolute bottom-6 right-6"
              shape="circle"
              icon={<PictureOutlined />}
            />
          </Tooltip>
        </div>

        <div className="bg-white h-16 rounded-b-md shadow-sm" />

        <div className="container -mt-20 px-4">
          <Row align="middle" justify="space-between" gutter={15}>
            <Col>
              <Space>
                <Avatar
                  size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  src={
                    user.images?.find((img) => img.type == "main")?.path ||
                    "/assets/placeholder.svg"
                  }
                  className="border-4 border-white bg-white"
                />

                <Space>
                  <Title level={5}>
                    {user.lastName} {user.firstName}
                  </Title>
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    {user.type}
                  </Tag>
                </Space>
              </Space>
            </Col>

            <Col>
              <Space>
                <div className="w-6 h-6 lg:w-6 lg:h-6 relative">
                  <Image
                    src={
                      user?.level
                        ? `/assets/volunteer/level_${user?.level}.png`
                        : "/assets/placeholder.svg"
                    }
                    alt="volunteerlevel"
                    fill
                    className="object-contain"
                  />
                </div>
                <Text strong>
                  <Tag
                    color={`${
                      user?.level == 1
                        ? "#1F276F"
                        : user?.level == 2
                        ? "#FEC01E"
                        : user?.level == 3
                        ? "#FD3716"
                        : "#000"
                    }`}
                  >
                    Level: {user?.level}
                  </Tag>
                </Text>

                <Divider type="vertical" />
                <Text strong>Миний хандив: 0₮</Text>
              </Space>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container mt-4">
        <Row gutter={[15, 15]}>
          <Col span={6}>
            <div className="bg-white p-8 rounded-md">
              <Flex justify="space-between">
                <Title level={5}>About Me</Title>
                <Link href="#">
                  <Button icon={<EditOutlined />} type="link" />
                </Link>
              </Flex>
              <Divider />
              {user?.bio}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum
              ut erat id semper. Duis venenatis luctus varius. Pellentesque
              tincidunt sit amet urna malesuada placerat. Pellentesque fringilla
              lectus non ultricies scelerisque. Ut consectetur egestas
              vestibulum. Sed varius vel augue in efficitur. Proin facilisis
              metus sit amet eleifend efficitur. Sed a tellus elementum,
              eleifend eros eget, pulvinar orci. Vestibulum imperdiet, lorem ut
              pulvinar lacinia, mi diam malesuada libero, a consectetur purus
              nunc quis urna. Pellentesque mattis interdum massa in
            </div>
          </Col>
          <Col span={18}>
            <Tabs defaultActiveKey="1" items={tabItems} type="card" />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
