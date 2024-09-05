"use client";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Tag, Table, Typography, Divider } from "antd";

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
    title: "Огноо",
    key: "date",
    dataIndex: "date",
  },
  {
    title: "Мөнгөн дүн",
    key: "amount",
    dataIndex: "amount",
  },
  {
    title: "Хуулга",
    dataIndex: "invoice",
    key: "invoice",
    render: (text, record) => (
      <Button
        icon={<CloudDownloadOutlined />}
        type="primary"
        ghost
        size="small"
      >
        татах
      </Button>
    ),
  },
];

const ProfileDonations = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={4}>Миний хандивууд</Title>

      <Table
        pagination={false}
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default ProfileDonations;
