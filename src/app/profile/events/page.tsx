"use client";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { myEvents } from "@/actions";
import dayjs from "dayjs";
import Image from "next/image";

import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Tag,
  Table,
  Typography,
  Result,
  Space,
  Select,
  Flex,
} from "antd";

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
}

const { Title, Text } = Typography;

// certification columns
const columns: TableProps<DataType>["columns"] = [
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
            {record.title}
            <Text type="secondary" className="block">
              {record.owner.username}
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
    render: (text, record) => <StateConverter />,
  },
];

const StateConverter = (state) => {
  switch (state) {
    case "new":
      return <Tag color="green">Хүсэлт илгээсэн</Tag>;
      break;
    case "approved":
      return <Tag color="green">Хүсэлт илгээсэн</Tag>;
      break;
    default:
      return <Tag color="green">Хүсэлт илгээсэн</Tag>;
  }
};

const EventList = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const isPartner = user?.type === "partner";

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await myEvents(token);

      if (result?.["hydra:member"] as any) {
        setEvents(result?.["hydra:member"]);
      }
    };

    fetchCertificateData();
  }, [user]);

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
            options={[
              {
                value: "Бүгд",
                label: "Бүгд",
              },
              {
                value: "joined",
                label: "Хүсэлт илгээсэн",
              },
              {
                value: "Оролцсон",
                label: "Оролцсон",
              },
              {
                value: "Миний Үүсгэсэн",
                label: "Миний Үүсгэсэн",
              },
            ]}
          />
          {isPartner && (
            <Link href={`/profile/events/create`}>
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
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default EventList;
