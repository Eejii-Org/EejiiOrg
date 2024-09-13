"use client";
import {
  Result,
  Row,
  Col,
  Typography,
  Divider,
  Tag,
  Flex,
  Image,
  Progress,
  Space,
} from "antd";
import { usePathname } from "next/navigation";
const { Title, Text } = Typography;

const EmptyBio = () => {
  return <Result status="warning" subTitle="Мэдээлэл оруулаагүй байна" />;
};

export const AboutMe = ({ user }: { user: any }) => {
  const pathname = usePathname();
  const isPublic = pathname.startsWith("/profile");

  return (
    <div className="bg-white p-8 rounded-md">
      <Row gutter={[15, 15]}>
        <Col span={isPublic ? 24 : 6} className="text-center">
          <Space direction="vertical">
            <Image
              src={
                user?.level
                  ? `/assets/volunteer/level_${user?.level}.png`
                  : "/assets/placeholder.svg"
              }
              alt="volunteerlevel"
              fill
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
        </Col>
        <Col span={isPublic ? 24 : 18}>
          {isPublic ? <Divider /> : null}
          <Title level={5}>Миний тухай</Title>
          {/* {bio} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum ut
          erat id semper. Duis venenatis luctus varius. Pellentesque tincidunt
          sit amet urna malesuada placerat. Pellentesque fringilla lectus non
          ultricies scelerisque. Ut consectetur egestas vestibulum. Sed varius
          vel augue in efficitur. Proin facilisis metus sit amet eleifend
          efficitur. Sed a tellus elementum, eleifend eros eget, pulvinar orci.
          Vestibulum imperdiet, lorem ut pulvinar lacinia, mi diam malesuada
          libero, a consectetur purus nunc quis urna. Pellentesque mattis
          interdum massa in
        </Col>
      </Row>

      <Divider />
      <Flex gap="4px 0" wrap>
        <Tag color="orange">Skill-1</Tag> <Tag color="orange">Skill-2</Tag>
        <Tag color="orange">Skill-3</Tag>
        <Tag color="orange">Skill-4</Tag> <Tag color="orange">Skill-3</Tag>
      </Flex>
    </div>
  );
};
