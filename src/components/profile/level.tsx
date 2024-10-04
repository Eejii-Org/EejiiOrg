"use client";
import { Result, Button, Typography, Divider, Tag, Flex } from "antd";

const { Title, Text } = Typography;

const EmptyBio = () => {
  return <Result status="warning" subTitle="Мэдээлэл оруулаагүй байна" />;
};

export const UserLevel = ({
  bio,
  skills,
}: {
  bio: string;
  skills: string[];
}) => {
  return (
    <div className="bg-white p-8 rounded-md">
      <Title level={5}>Миний тухай</Title>
      {/* {bio} */}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum ut erat
      id semper. Duis venenatis luctus varius. Pellentesque tincidunt sit amet
      urna malesuada placerat. Pellentesque fringilla lectus non ultricies
      scelerisque. Ut consectetur egestas vestibulum. Sed varius vel augue in
      efficitur. Proin facilisis metus sit amet eleifend efficitur. Sed a tellus
      elementum, eleifend eros eget, pulvinar orci. Vestibulum imperdiet, lorem
      ut pulvinar lacinia, mi diam malesuada libero, a consectetur purus nunc
      quis urna. Pellentesque mattis interdum massa in
      <Divider />
      <Flex gap="4px 0" wrap>
        <Tag color="orange">Skill-1</Tag> <Tag color="orange">Skill-2</Tag>
        <Tag color="orange">Skill-3</Tag>
        <Tag color="orange">Skill-4</Tag> <Tag color="orange">Skill-3</Tag>
      </Flex>
    </div>
  );
};
