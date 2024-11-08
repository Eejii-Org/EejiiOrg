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
  CalendarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tag,
  Table,
  Typography,
  Space,
  Select,
  Flex,
  Modal,
  Result,
  Row,
  Col,
} from "antd";

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
  const [events, setEvents] = useState();
  const isVolunteer = user?.type === "volunteer";
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const [showModal, setShowModal] = useState();

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

  const handleCreateEvent = () => {
    setShowModal(true);
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
              src={
                record?.images?.filter((img) => img.type === "event")?.pop()
                  ?.path || "/assets/placeholder.svg"
              }
              width={40}
              height={40}
              className=" rounded-md"
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
          <Button size="small" type="primary">
            {record.eventUsers.length}
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
          {isVolunteer ? (
            <div>
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
            </div>
          ) : (
            <Button type="primary" onClick={handleCreateEvent}>
              <PlusCircleOutlined /> Шинээр үүсгэх
            </Button>
          )}
        </Space>
      </Flex>

      <Table
        loading={events ? false : true}
        pagination={false}
        dataSource={events}
        columns={isVolunteer ? volunteerColumns : partnerColumns}
        className="border-t border-[#eee] mt-6"
      />

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        width={700}
      >
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Result
              className="bg-[#f5f5f5]  rounded-md"
              icon={<CalendarOutlined />}
              title="Арга хэмжээ"
              subTitle={`Сайн дурыханыг татан оролцуулах боломжгүй. Танд ${user?.eventPermit} эрх байна.`}
              extra={[
                <Link
                  href="/profile/events/create?type=event"
                  key="Шинээр үүсгэх"
                >
                  <Button type="primary" key="console">
                    Шинээр үүсгэх
                  </Button>
                </Link>,
              ]}
            />
          </Col>

          <Col span={12}>
            <Result
              className="bg-[#f5f5f5]  rounded-md"
              icon={<UsergroupAddOutlined />}
              title="Сайн дурын ажил"
              subTitle={`Сайн дурыханыг татан оролцуулах боломжтой. Танд ${user?.volunteeringEventPermit} эрх байна.`}
              extra={[
                <Link
                  href="/profile/events/create?type=volunteering_event"
                  key="Шинээр үүсгэх"
                >
                  <Button type="primary" key="console">
                    Шинээр үүсгэх
                  </Button>
                </Link>,
              ]}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default EventList;
