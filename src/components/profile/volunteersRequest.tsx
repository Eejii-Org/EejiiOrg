"use client";
import { Typography, Divider, Tag, Flex, Image, Progress, Space } from "antd";
const { Title, Text } = Typography;

export const VolunteersRequest = ({ user }: { user: any }) => {
  const isVolunteer = user?.type === "volunteer";

  return (
    <div className="bg-white p-8 rounded-md">
      <Title level={5}>Ирсэн хүсэлтүүд </Title>
      {user?.bio}
    </div>
  );
};
