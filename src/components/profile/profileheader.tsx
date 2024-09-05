"use client";
import Image from "next/image";
import { UserType } from "@/types";
import {
  HomeOutlined,
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
                  <Link href="/profile">
                    <Title level={4}>
                      {user.lastName} {user.firstName}{" "}
                      <Tooltip
                        title="Verified Volunteer"
                        placement="right"
                        defaultOpen={true}
                        color="blue"
                      >
                        <CheckCircleTwoTone />
                      </Tooltip>
                    </Title>
                  </Link>
                </Space>
              </Space>
            </Col>

            <Col>
              <Space className="hidden sm:flex">
                <div className="w-6 h-6 lg:w-6 lg:h-6 relative">
                  <Image
                    src={
                      user?.level
                        ? `/assets/volunteer/level_${user?.level}.png`
                        : "/assets/placeholder.svg"
                    }
                    alt="volunteerlevel"
                    fill
                    className="object-contain"
                  />
                </div>

                <Text strong>
                  <Tag
                    color={`${
                      user?.level == 1
                        ? "#1F276F"
                        : user?.level == 2
                        ? "#FEC01E"
                        : user?.level == 3
                        ? "#FD3716"
                        : "#000"
                    }`}
                  >
                    Level: {user?.level}
                  </Tag>
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
