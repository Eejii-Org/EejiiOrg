"use client";
import { Typography, Divider, Tag, Flex, Image, Progress, Space } from "antd";
const { Title, Text } = Typography;

export const AboutMe = ({ user }: { user: any }) => {
  const isVolunteer = user?.type === "volunteer";

  const RenderLevel = () => {
    return (
      <Space
        direction="vertical"
        style={{ width: "100%", textAlign: "center" }}
      >
        <Image
          src={
            user?.level
              ? `/assets/volunteer/level_${user?.level}.png`
              : "/assets/placeholder.svg"
          }
          alt="volunteerlevel"
          className="object-contain max-w-[100px]"
        />
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
          <div>0/0 XP</div>
        </Text>

        <Progress percent={30} />
      </Space>
    );
  };

  if (isVolunteer) {
    return (
      <div className="bg-white p-8 rounded-md">
        <RenderLevel />
        <Divider />
        <Title level={5}>Миний тухай</Title>
        {user?.bio}
        {isVolunteer && (
          <>
            <Divider />
            <Flex gap="4px 0" wrap>
              <Tag color="orange">Skill-1</Tag>{" "}
              <Tag color="orange">Skill-2</Tag>
              <Tag color="orange">Skill-3</Tag>
              <Tag color="orange">Skill-4</Tag>{" "}
              <Tag color="orange">Skill-3</Tag>
            </Flex>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-md">
      <Title level={5}>Бидний тухай</Title>
      {user?.bio}
    </div>
  );
};
