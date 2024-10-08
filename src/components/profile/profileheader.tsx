"use client";
import { UserType } from "@/types";
import {
  ExclamationCircleTwoTone,
  PictureOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography, Avatar, Button, Space, Tooltip, Flex } from "antd";
import Link from "next/link";
const { Title } = Typography;

export const ProfileHeader = ({ user }: { user: UserType }) => {
  const isVolunteer = user?.type === "volunteer";
  const isVerified = user?.state === "accepted";
  const iconColor = isVerified ? null : "#fa8c16";

  const firstName = user?.firstName ? user?.firstName : "";
  const lastName = user?.lastName ? user?.lastName : "";

  console.log("user", user);

  const name = isVolunteer ? `${firstName} ${lastName}` : user?.organization;

  return (
    <div>
      <div
        className="w-full rounded-t-md relative h-96"
        style={{
          background: isVolunteer
            ? "url(/assets/profile/profile-bg.jpg)"
            : "url(/assets/partner/bg.jpg)",
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
          <Flex justify="space-between">
            <Space>
              <Avatar
                size={80}
                src={
                  user?.images?.find((img) => img.type == "main")?.path ||
                  "/assets/placeholder.svg"
                }
                className="border-4 border-white -mt-2 bg-white"
              />

              <Tooltip
                defaultOpen
                title={isVerified ? "Verified" : "Not Verified"}
                placement="right"
                color={isVerified ? "blue" : "orange"}
              >
                <Title level={4}>
                  <Space>
                    {name}
                    <ExclamationCircleTwoTone twoToneColor={iconColor} />
                  </Space>
                </Title>
              </Tooltip>
            </Space>

            <div>
              <Title level={4}>
                <Tooltip title="Зочин байдлаар харах" placement="right">
                  <Link href={`/public/${user?.type}?id=${user?.id}`}>
                    <EyeOutlined />
                  </Link>
                </Tooltip>
              </Title>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};
