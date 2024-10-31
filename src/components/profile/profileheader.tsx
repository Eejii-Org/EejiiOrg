"use client";
import { useState } from "react";
import { UserType } from "@/types";
import {
  ExclamationCircleTwoTone,
  PictureOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import ImageUpload from "@/components/imageUpload";
import { Typography, Avatar, Button, Space, Tooltip, Flex, Modal } from "antd";
import Link from "next/link";
const { Title } = Typography;

export const ProfileHeader = ({ user }: { user: UserType }) => {
  const isVolunteer = user?.type === "volunteer";
  const isVerified = user?.state === "accepted";
  const iconColor = isVerified ? null : "#fa8c16";
  const [showUploadModal, setShowUploadModal] = useState(false);
  const firstName = user?.firstName ? user?.firstName : "";
  const lastName = user?.lastName ? user?.lastName : "";
  const name = isVolunteer ? `${firstName} ${lastName}` : user?.organization;
  const [imageType, setImageType] = useState<string>();

  const handleUploadSuccess = (data: any) => {
    console.log("handleUploadSuccess data", data);
    if (data) {
      // Update user images with the new image data
      user.images = [...user?.images, data];
    }
    setShowUploadModal(false);
  };

  const changeMainImage = () => {
    setImageType("main");
    setShowUploadModal(true);
  };

  const changeProfileImage = () => {
    setImageType("profile");
    setShowUploadModal(true);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div
        className="w-full rounded-t-md relative h-112"
        style={{
          backgroundImage: `url(${
            user?.images?.filter((img) => img.type === "main")?.pop()?.path ||
            (isVolunteer
              ? "/assets/profile/profile-bg.jpg"
              : "/assets/partner/bg.jpg")
          })`,

          backgroundSize: "cover",
        }}
      >
        <Tooltip title="Зураг шинчлэх" placement="left">
          <Button
            ghost
            className="absolute bottom-6 right-6"
            shape="circle"
            icon={<PictureOutlined />}
            onClick={changeMainImage}
          />
        </Tooltip>
      </div>

      <div className="bg-white h-16 rounded-b-md shadow-sm">
        <div className="container  px-4">
          <Flex justify="space-between" align="center">
            <div>
              <Space>
                <Tooltip title="Зураг шинчлэх" placement="top">
                  <Avatar
                    size={80}
                    onClick={changeProfileImage}
                    src={
                      user?.images
                        ?.filter((img) => img.type === "profile")
                        ?.pop()?.path || "/assets/placeholder.svg"
                    }
                    className="border-4 border-white -mt-2 bg-white cursor-pointer"
                  />
                </Tooltip>

                <Tooltip
                  defaultOpen
                  title={
                    isVerified
                      ? `Verified ${capitalizeFirstLetter(user.type)}`
                      : "Not Verified"
                  }
                  placement="right"
                  color={isVerified ? "blue" : "orange"}
                >
                  <Title level={4}>
                    <Space>
                      {name}
                      {isVerified ? (
                        <CheckCircleTwoTone twoToneColor={iconColor} />
                      ) : (
                        <ExclamationCircleTwoTone twoToneColor={iconColor} />
                      )}
                    </Space>
                  </Title>
                </Tooltip>
              </Space>
            </div>
            <div>
              <Title level={4}>
                <Tooltip title="Зочин байдлаар харах" placement="left">
                  <Link href={`/public/${user?.type}?id=${user?.id}`}>
                    <EyeOutlined />
                  </Link>
                </Tooltip>
              </Title>
            </div>
          </Flex>
        </div>
      </div>

      <Modal
        title="Зураг шинчлэх"
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        okText="Хадгалах"
        cancelButtonProps={{ style: { display: "none" } }}
        footer={false}
        destroyOnClose={true}
      >
        <ImageUpload
          imageType={imageType}
          onUploadSuccess={handleUploadSuccess}
        />
      </Modal>
    </div>
  );
};
