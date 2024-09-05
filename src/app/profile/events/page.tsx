"use client";
import { CertificateType } from "@/types";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getCertificate } from "@/actions";
import dayjs from "dayjs";

import { CloudDownloadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Tag,
  Table,
  Typography,
  Flex,
  Radio,
  Checkbox,
  Divider,
  Form,
  Space,
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

const { Title } = Typography;

// certification columns
const columns: TableProps<DataType>["columns"] = [
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
    title: "Төлөв",
    dataIndex: "grade",
    key: "grade",
    render: (text, record) => <Tag color="green">+{text}</Tag>,
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
        <Button
          icon={<CloudDownloadOutlined />}
          type="primary"
          ghost
          size="small"
        >
          татах
        </Button>
      </Link>
    ),
  },
];

const EventList = () => {
  const { user } = useAuth();
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

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Миний арга хэмжээнүүд</Title>
        <Link href={`/profile/events/create`}>
          <Button type="primary" ghost>
            <PlusCircleOutlined /> Шинээр үүсгэх
          </Button>
        </Link>
      </Flex>

      <Divider />

      <Form>
        <Form.Item noStyle>
          <Radio.Group>
            <Radio value={1}>Бүгд</Radio>
            <Radio value={2}>Оролцох хүсэлт илгээсэн</Radio>
            <Radio value={3}>Оролцож байгаа</Radio>
            <Radio value={4}>Дууссан</Radio>
            <Radio value={5}>Миний Үүсгэсэн</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>

      <Table
        pagination={false}
        dataSource={certificateData}
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default EventList;
