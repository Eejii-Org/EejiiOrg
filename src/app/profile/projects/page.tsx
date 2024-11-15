"use client";
import { useEffect, useState } from "react";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table, Typography, Flex } from "antd";

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
    title: "Үүсгэсэн огноо",
    key: "date",
    dataIndex: "date",
  },
  {
    title: "Төслийн нэр",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Үргэлжлэх хугацаа",
    key: "amount",
    dataIndex: "amount",
  },
  {
    title: "Төрөл",
    key: "type",
    dataIndex: "invoice",
  },
  {
    title: "Цугласан",
    key: "type",
    dataIndex: "invoice",
  },
  {
    title: "Зорилго",
    key: "type",
    dataIndex: "invoice",
  },
];

const ProfileProjects = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Миний төсөл хөтөлбөрүүд</Title>
        <Button type="primary" ghost>
          <PlusCircleOutlined /> Шинээр үүсгэх
        </Button>
      </Flex>

      <Table
        pagination={false}
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default ProfileProjects;
