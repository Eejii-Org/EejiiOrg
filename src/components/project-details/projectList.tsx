"use client";
import { CertificateType } from "@/types";
import type { TableProps } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Tag, Table } from "antd";

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
}

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

export const EventList = ({
  certificate,
}: {
  certificate: CertificateType;
}) => {
  return (
    <Table
      pagination={false}
      dataSource={certificate}
      columns={columns}
      className="bg-white p-4 rounded-b-md -mt-4"
    />
  );
};
