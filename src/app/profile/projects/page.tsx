"use client";
import { useEffect, useState } from "react";
import type { TableProps } from "antd";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";

import {
  PlusCircleOutlined,
  DropboxOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import { Button, Table, Typography, Flex, Modal, Row, Col, Result } from "antd";

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
  const [showModal, setShowModal] = useState();

  const handleCreateProject = () => {
    setShowModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Миний төсөл хөтөлбөрүүд</Title>
        <Button type="primary" onClick={handleCreateProject}>
          <PlusCircleOutlined /> Шинээр үүсгэх
        </Button>
      </Flex>

      <Table
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
