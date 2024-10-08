"use client";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import dayjs from "dayjs";

import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Tag, Table, Typography, Divider, message } from "antd";

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
    key: "createdAt",
    dataIndex: "createdAt",
    render: (text, record) => {
      return dayjs(text).format("YYYY.MM.DD - HH:MM");
    },
  },
  {
    title: "Мөнгөн дүн",
    key: "amount",
    dataIndex: "amount",
  },
  {
    title: "Гүйлгээ",
    dataIndex: "state",
    key: "state",
    render: (text, record) => <Tag color="green">Амжилттай</Tag>,
  },
];

const ProfileDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await api.get("/api/getMyDonations");

      if (!result.success) {
        message.warning(result.message.message);
      }

      setDonations(result?.data);
    };

    fetch();
  }, [user]);

  console.log("donations", donations);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={4}>Миний хандивууд</Title>

      <Table
        dataSource={donations}
        pagination={false}
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default ProfileDonations;
