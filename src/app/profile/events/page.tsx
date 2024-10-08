"use client";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PlusCircleOutlined,
  EditOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Tag, Table, Typography, Space, Select, Flex } from "antd";

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
  registrationStartTime: string;
  registrationEndTime: string;
}

const { Title, Text } = Typography;

const StateConverter = (data: boolean) => {
  console.log("state", data.state);
  switch (data.state) {
    case "accepted":
      return <Tag color="green">Зөвшөөрсөн</Tag>;
      break;
    case "pending":
      return <Tag color="orange">Хүсэлт илгээсэн</Tag>;
      break;
    default:
      return <Tag color="green">Хүсэлт илгээсэн</Tag>;
  }
};

const EventList = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const isVolunteer = user?.type === "volunteer";
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  const fetchEvents = async () => {
    let result;

    if (isVolunteer) {
      const stateFilter = !state ? "" : `?state=${state}`;
      result = await api.get(`/api/me/eventRequests${stateFilter}`);
    } else {
      result = await api.get("/api/events?myCreated=true");
    }

    if (result?.data?.["hydra:member"] as any) {
      setEvents(result?.data?.["hydra:member"]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user, isVolunteer]);

  useEffect(() => {
    fetchEvents();
  }, [searchParams]);

  const handleStateFilter = (value) => {
    if (!value) {
      router.push(`/profile/events`);
    } else {
      router.push(`/profile/events?state=${value}`);
    }
  };

  // event columns
  const volunteerColumns: TableProps<DataType>["columns"] = [
    {
      title: "Нэр",
      key: "title",
      render: (text, record) => (
        <Link href="#">
          <Space>
            <Image
              src={"/assets/placeholder.svg"}
              width={40}
              height={40}
              className="object-cover rounded-md"
            />
            <div>
              {record.event.title}
              <Text type="secondary" className="block">
                {record.event.owner.organization}
              </Text>
            </div>
          </Space>
        </Link>
      ),
    },
    {
      title: "Үргэлжлэх хугацаа",
      key: "dateRange",
      render: (text, record) => {
        const startDate = dayjs(record.startTime);
        const endDate = dayjs(record.endTime);

        return (
          <div>
            {startDate.format("YYYY.MM.DD")} - {endDate.format("YYYY.MM.DD")}
          </div>
        );
      },
    },
    {
      title: "Зарцуулах цаг",
      dataIndex: "volunteeringHours",
      key: "volunteeringHours",
      render: (text, record) => {
        const hours = record.volunteeringHours;
        if (!hours) return "N/A";

        return record.volunteeringHours;
      },
    },
    {
      title: "Одоогийн төлөв",
      dataIndex: "state",
      key: "state",
      render: (text, record) => <StateConverter state={text} />,
    },
  ];

  const partnerColumns: TableProps<DataType>["columns"] = [
    {
      title: "Нэр",
      key: "title",
      render: (text, record) => (
        <Link href={`/events/${record.slug}`} target="_blank">
          <Space>
            <Image
              src={"/assets/placeholder.svg"}
              width={40}
              height={40}
              className="object-cover rounded-md"
            />
            <div>
              <Text strong>{record.title}</Text>
              <Text type="secondary" className="block">
                {record?.type === "event" ? "Арга хэмжээ" : "Сайн дурын ажил"}
              </Text>
            </div>
          </Space>
        </Link>
      ),
    },
    {
      title: "Бүртгэл үргэлжлэх ",
      dataIndex: "volunteeringHours",
      key: "volunteeringHours",
      render: (text, record) => {
        const startDate = dayjs(record.registrationStartTime);
        const endDate = dayjs(record.registrationEndTime);

        return (
          <div>
            {startDate.format("YYYY.MM.DD")} <br />{" "}
            {endDate.format("YYYY.MM.DD")}
          </div>
        );
      },
    },
    {
      title: "Үргэлжлэх хугацаа",
      key: "dateRange",
      render: (text, record) => {
        const startDate = dayjs(record.startTime);
        const endDate = dayjs(record.endTime);

        return (
          <div>
            {startDate.format("YYYY.MM.DD")} <br />{" "}
            {endDate.format("YYYY.MM.DD")}
          </div>
        );
      },
    },

    {
      title: "Төлөв",
      dataIndex: "isEnabled",
      key: "isEnabled",
      render: (text, record) =>
        text ? (
          <Tag color="green">Нийтлэгдсэн</Tag>
        ) : (
          <Tag color="warning">Хянагдаж байна</Tag>
        ),
    },
    {
      title: "Хүсэлтүүд",
      key: "edit",
      align: "center",
      render: (text, record) => (
        <Link href={`/profile/reqiuests?event=${record?.slug}`}>
          <Button size="small" icon={<UserSwitchOutlined />}>
            0
          </Button>
        </Link>
      ),
    },
    {
      title: "Сонгогдсон",
      key: "edit",
      render: (text, record) => (
        <Link href={`/profile/reqiuests?event=${record?.slug}&state=accepted`}>
          <Button size="small" icon={7}>
            - Харах
          </Button>
        </Link>
      ),
    },
    {
      title: "Засах",
      key: "edit",
      render: (text, record) => (
        <Link href={`/profile/events/edit?slug=${record.slug}`}>
          <Button size="small" icon={<EditOutlined />} />
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Миний арга хэмжээнүүд</Title>

        <Space>
          Шүүж харах:
          <Select
            defaultValue="Бүгд"
            style={{
              width: 150,
            }}
            onChange={handleStateFilter}
            options={[
              {
                value: null,
                label: "Бүгд",
              },
              {
                value: "pending",
                label: "Хүсэлт илгээсэн",
              },
              {
                value: "accepted",
                label: "Зөвшөөрсөн",
              },
              {
                value: "denied",
                label: "Татгалзсан",
              },
              {
                value: "cancelled",
                label: "Цуцлагдсан",
              },
              {
                value: "done",
                label: "Дууссан",
              },
            ]}
          />
          {!isVolunteer && (
            <Link href="/profile/events/create">
              <Button type="primary">
                <PlusCircleOutlined /> Шинээр үүсгэх
              </Button>
            </Link>
          )}
        </Space>
      </Flex>

      <Table
        pagination={false}
        dataSource={events}
        columns={isVolunteer ? volunteerColumns : partnerColumns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default EventList;
