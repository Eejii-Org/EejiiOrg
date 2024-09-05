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
    title: "Огноо",
    key: "date",
    dataIndex: "date",
  },
  {
    title: "Хандив",
    key: "donation",
    render: (text, record) => record.event.title,
  },
  {
    title: "Хандивийн төрөл",
    dataIndex: "grade",
    key: "grade",
    render: (text, record) => <Tag color="green">+{text}</Tag>,
  },
];

export const DonationList = () => {
  return (
    <Table
      columns={columns}
      className="bg-white p-4 rounded-b-md -mt-4"
      pagination={false}
    />
  );
};
