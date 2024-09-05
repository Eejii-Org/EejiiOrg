"use client";
import {
  Row,
  Col,
  List,
  Space,
  Result,
  Button,
  Flex,
  Divider,
  Typography,
} from "antd";
import { redirect } from "next/navigation";
import { MainLayout, ProfileHeader } from "@/components";
import { useAuth } from "@/providers";
import Link from "next/link";
import {
  SettingOutlined,
  FilePdfOutlined,
  DollarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { Title } = Typography;

const EmptyBio = () => {
  return (
    <Result
      status="warning"
      subTitle="Та өөрийн миний тухай хэсгийг оруулна уу."
      extra={[
        <Button type="primary" key="console">
          Засах
        </Button>,
      ]}
    />
  );
};

const PublicProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, userLoading } = useAuth();
  const pathname = usePathname();

  console.log("pathname", pathname);

  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/");
  }

  const profileMenu = [
    {
      key: "1",
      label: (
        <Space>
          <FilePdfOutlined /> Хянах самбар
        </Space>
      ),

      link: "/profile",
    },
    {
      key: "2",
      label: (
        <Space>
          <FilePdfOutlined /> Арга хэмжээнүүд
        </Space>
      ),
      link: "/profile/events",
    },
    {
      key: "3",
      label: (
        <Space>
          <FilePdfOutlined /> Төсөл хөтөлбөрүүд
        </Space>
      ),
      link: "/profile/projects",
    },
    {
      key: "4",
      label: (
        <Space>
          <FilePdfOutlined /> Ирсэн хүсэлтүүд
        </Space>
      ),
      link: "/profile/projects",
    },
    {
      key: "5",
      label: (
        <Space>
          <DollarOutlined /> Хандив
        </Space>
      ),
      link: "/profile/donations",
    },
    {
      key: "6",
      label: (
        <Space>
          <SettingOutlined /> Байгууллага
        </Space>
      ),
      link: "/profile/edit",
    },
    {
      key: "7",
      label: (
        <Space>
          <SettingOutlined /> Тохиргоо
        </Space>
      ),
      link: "/profile/edit",
    },
  ];

  return (
    <MainLayout>
      <div className="bg-slate-100 min-h-screen">
        <ProfileHeader user={user} />

        <div className="container py-6">
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="bg-white p-8 mb-4 rounded-md">
                <List
                  dataSource={profileMenu}
                  renderItem={(item) => (
                    <List.Item>
                      <Link
                        href={item.link}
                        className={`link ${
                          pathname === item.link && "font-semibold"
                        }`}
                      >
                        {item.label}{" "}
                      </Link>
                    </List.Item>
                  )}
                />
              </div>

              <div className="bg-white p-8 rounded-md">
                <Flex justify="space-between">
                  <Title level={5}>About Me</Title>
                  <Link href="#">
                    <Button icon={<EditOutlined />} type="link" />
                  </Link>
                </Flex>
                {user?.bio}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                rutrum ut erat id semper. Duis venenatis luctus varius.
                Pellentesque tincidunt sit amet urna malesuada placerat.
                Pellentesque fringilla lectus non ultricies scelerisque. Ut
                consectetur egestas vestibulum. Sed varius vel augue in
                efficitur. Proin facilisis metus sit amet eleifend efficitur.
                Sed a tellus elementum, eleifend eros eget, pulvinar orci.
                Vestibulum imperdiet, lorem ut pulvinar lacinia, mi diam
                malesuada libero, a consectetur purus nunc quis urna.
                Pellentesque mattis interdum massa in
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

export default PublicProfileLayout;
