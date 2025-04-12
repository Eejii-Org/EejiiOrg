"use client";
import { useEffect, useState } from "react";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { api } from "@/actions";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import {
  PlusCircleOutlined,
  DropboxOutlined,
  CodeSandboxOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Table,
  Typography,
  Flex,
  Modal,
  Row,
  Col,
  Result,
  Space,
  Tag,
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

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}

// certification columns
const columns: TableProps<DataType>["columns"] = [
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
            <Text strong>{truncate(record.title, 20)}</Text>
            <Text type="secondary" className="block">
              {record?.type === "event" ? "Арга хэмжээ" : "Сайн дурын ажил"}
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
          {startDate.format("YYYY.MM.DD")} <br /> {endDate.format("YYYY.MM.DD")}
        </div>
      );
    },
  },

  {
    title: "Төлөв",
    dataIndex: "isEnabled",
    key: "isEnabled",
    render: (text, record) => {
      const done = "done"; // Make sure this value matches your actual condition

      if (record.state === done) {
        return <Tag color="blue">Дууссан</Tag>;
      }

      return record.isEnabled ? (
        <Tag color="green">Нийтлэгдсэн</Tag>
      ) : (
        <Tag color="warning">Хянагдаж байна</Tag>
      );
    },
  },
  {
    title: "Зорилтод мөнгөн дүн",
    key: "type",
    render: (text, record) => {
      return record.goalAmount;
    },
  },
  {
    title: "Босгосон мөнгөн дүн",
    key: "type",
    render: (text, record) => {
      return record.currentAmount;
    },
  },
  {
    title: "Засах",
    key: "edit",
    render: (text, record) => (
      <Link href={`/profile/projects/edit?slug=${record.slug}`}>
        <Button size="small" icon={<EditOutlined />} />
      </Link>
    ),
  },
];

const ProfileProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState();
  const [showModal, setShowModal] = useState();

  const handleCreateProject = () => {
    setShowModal(true);
  };

  const fetchProjects = async () => {
    let result;

    result = await api.get("/api/projects?myCreated=true");

    if (result?.data?.["hydra:member"] as any) {
      setProjects(result?.data?.["hydra:member"]);
    }

    console.log("result", result);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Миний төсөл хөтөлбөрүүд</Title>
        <Button type="primary" onClick={handleCreateProject}>
          <PlusCircleOutlined /> Шинээр үүсгэх
        </Button>
      </Flex>

      <Table
        dataSource={projects}
        pagination={false}
        columns={columns}
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
              icon={<DropboxOutlined />}
              title="Өгөх төсөл"
              subTitle={`Танд хандив өгөх төсөл үүсгэх ${user?.fundraisingPermit} эрх байна.`}
              extra={[
                <Link
                  href="/profile/projects/create?type=fundraising"
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
              icon={<CodeSandboxOutlined />}
              title="Хандив босгох төсөл"
              subTitle={`Танд хандив авах төсөл үүсгэх ${user?.grantFundraisingPermit} эрх байна.`}
              extra={[
                <Link
                  href="/profile/projects/create?type=grant_fundraising"
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

export default ProfileProjects;
