"use client";
import Image from "next/image";
import { UserType } from "@/types";
import {
  ExclamationCircleTwoTone,
  CheckCircleTwoTone,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Divider,
  Typography,
  Avatar,
  Button,
  Tag,
  Space,
  Tooltip,
  Breadcrumb,
} from "antd";

import Link from "next/link";

const { Text, Title } = Typography;

export const ProfileHeader = ({ user }: { user: UserType }) => {
  const name = user?.organization || `${user.lastName} ${user.firstName}`;

  const RenderVerify = () => {
    const approved = user?.approved;

    if (!approved)
      return (
        <Title level={4}>
          {name} {""}
          <Tooltip
            title="Not Verified"
            placement="right"
            color="orange"
            defaultOpen={true}
          >
            <ExclamationCircleTwoTone twoToneColor="#fa8c16" />
          </Tooltip>
        </Title>
      );

    return (
      <Title level={4}>
        {name} {""}
        <Tooltip title="Verified" placement="right" color="blue" open={true}>
          <CheckCircleTwoTone />
        </Tooltip>
      </Title>
    );
  };
  return (
    <div>
      <div
        className="w-full rounded-t-md h-52 relative"
        style={{
          background: "url(/assets/profile/profile-bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Tooltip title="Зураг шинчлэх" placement="left">
          <Button
            ghost
            className="absolute bottom-6 right-6"
            shape="circle"
            icon={<PictureOutlined />}
          />
        </Tooltip>
      </div>

      <div className="bg-white h-16 rounded-b-md shadow-sm">
        <div className="container  px-4">
          <Row align="middle" justify="space-between" gutter={15}>
            <Col>
              <Space>
                <Avatar
                  size={80}
                  src={
                    user.images?.find((img) => img.type == "main")?.path ||
                    "/assets/placeholder.svg"
                  }
                  className="border-4 border-white -mt-2 bg-white"
                />

                <Space>
                  <RenderVerify />
                </Space>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
