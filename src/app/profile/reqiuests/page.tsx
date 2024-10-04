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
  Button,
  Alert,
  Table,
  Typography,
  Space,
  Card,
  Flex,
  Divider,
  message,
  Radio,
  Select,
} from "antd";
import relativeTime from "dayjs/plugin/relativeTime";
import { SendOutlined } from "@ant-design/icons";

const { Meta } = Card;

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
dayjs.extend(relativeTime);

const EventReqiuests = () => {
  const { user } = useAuth();
  const [eventList, setEventList] = useState();
  const [event, setEvent] = useState();
  const [eventUsers, setEventUsers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();
  const searchParams = useSearchParams();
  const eventName = searchParams.get("event");
  const state = searchParams.get("state");
  const router = useRouter();

  console.log("eventName", eventName);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await api.get("/api/events?myCreated=true");

      if (result?.data?.["hydra:member"] as any) {
        setEventList(result?.data?.["hydra:member"]);
      }
    };

    fetchEvents();
  }, [user]);

  useEffect(() => {
    const fetchEvent = async () => {
      const endpoint = `/api/events/${eventName}`;
      const result = await api.get(endpoint);

      if (result?.data) {
        setEvent(result?.data);
      }
    };

    const fetchEventUsers = async () => {
      const stateFilter = !state ? "" : `?state=${state}`;
      const endpoint = `/api/events/${eventName}/eventUsers${stateFilter}`;

      const result = await api.get(endpoint);

      if (result?.data?.["hydra:member"] as any) {
        setEventUsers(result?.data?.["hydra:member"]);
      }
    };

    fetchEvent();
    fetchEventUsers();
  }, [user, searchParams]);

  const handleChangeEvent = (val) => {
    if (!val) return;

    router.push(`/profile/reqiuests?event=${val}`);
  };

  const handleAccept = async (userId) => {
    console.log("userId", userId);
    const result = await api.put(
      `/api/events/${eventName}/eventUsers/${userId}/accept`
    );

    if (!result.success) {
      message.warning(result?.message?.message);
    }

    console.log("result", result);
  };

  console.log("eventUsers", eventUsers);

  const handleStateFilter = (e) => {
    const value = e.target.value;

    if (!value) {
      router.push(`/profile/reqiuests?event=${eventName}`);
    } else {
      router.push(`/profile/reqiuests?event=${eventName}&state=${value}`);
    }
  };

  const EventInfoBoard = () => {
    if (!eventName) {
      return (
        <Alert
          className="mt-4"
          description="Та одоогоор ямарч арга хэмжээ сонгоогүй байна!"
          type="info"
          showIcon
        />
      );
    }

    return (
      <div className="bg-[#e6f4ff] border border-[#91caff] p-4 rounded-md mt-4 bg-gray">
        <Space size="small" split={<Divider type="vertical" />}>
          <Space>
            Бүртгэл эхлэх:
            <Text>
              {dayjs(event?.registrationStartTime).format("YYYY.MM.DD")}
            </Text>
          </Space>
          <Space>
            Бүртгэл хаагдах:
            <Text>
              {dayjs(event?.registrationEndTime).format("YYYY.MM.DD")}
            </Text>
          </Space>
          <Space>
            Одоогийн байдлаар cонгогдсон:
            <Text>12</Text>
          </Space>
        </Space>
      </div>
    );
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Нэр",
      key: "title",
      render: (text, record) => (
        <Link
          href={`/public/${record.userType}?id=${record?.owner?.id}`}
          target="_blank"
        >
          <Space>
            <Image
              src={"/assets/placeholder.svg"}
              width={40}
              height={40}
              className="object-cover rounded-md"
            />
            <div>
              <Text strong>
                {record.owner.firstName} {record.owner.lastName}
              </Text>
              <Text type="secondary" className="block">
                {record?.userType}
              </Text>
            </div>
          </Space>
        </Link>
      ),
    },
    {
      title: "Огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        return dayjs(text).fromNow();
      },
    },
    {
      title: "Түвшин",
      dataIndex: "owner",
      key: "level",
      align: "center",
      render: (text, record) => {
        return text.level;
      },
    },
    {
      title: "Хүйс",
      dataIndex: "owner",
      key: "gender",
      render: (text, record) => {
        return <div>{text === "f" ? "Эмэгтэй" : "Эрэгтэй"}</div>;
      },
    },
    {
      title: "Нас",
      dataIndex: "owner",
      key: "birthday",
      render: (text, record) => {
        const age = dayjs().diff(text.birthday, "year");
        return age;
      },
    },
    {
      title: "Утас",
      dataIndex: "owner",
      key: "phoneNumber",
      render: (text, record) => text.phoneNumber,
    },
    {
      key: "edit",
      align: "right",
      render: (text, record) => {
        if (record.state === "accepted") {
          return (
            <Button size="small" type="primary" icon={<SendOutlined />}>
              Сертификат олгох
            </Button>
          );
        } else {
          return (
            <Button
              type="primary"
              onClick={() => handleAccept(record?.owner?.id)}
            >
              Сонгох
            </Button>
          );
        }
      },
    },
  ];

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Ирсэн хүсэлтүүд</Title>
      <Divider />

      <Flex justify="space-between">
        <Radio.Group value={state} onChange={handleStateFilter}>
          <Radio value={null}>Бүгд</Radio>
          <Radio value="accepted">Сонгогдсон</Radio>
          <Radio value="pending">Сонгогдоогүй</Radio>
        </Radio.Group>
        <Space>
          Арга хэмжээ сонгох:
          <Select
            value={eventName}
            onChange={handleChangeEvent}
            placeholder="Арга хэмжээгээ сонгоно уу"
            style={{ width: 320 }}
            options={eventList?.map((item) => ({
              label: item.title,
              value: item.slug,
            }))}
          />
        </Space>
      </Flex>

      <Table
        pagination={false}
        dataSource={eventUsers}
        columns={columns}
        className="border-t border-[#eee] mt-6"
      />
    </div>
  );
};

export default EventReqiuests;
