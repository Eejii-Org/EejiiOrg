"use client";
import { useEffect } from "react";
import { AboutMe } from "@/components";
import { Row, Col, List, Space } from "antd";
import { redirect } from "next/navigation";
import { MainLayout, ProfileHeader } from "@/components";
import { useAuth } from "@/providers";
import Link from "next/link";
import {
  SettingOutlined,
  FilePdfOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // Define routes that are restricted for 'volunteer' users
  const restrictedRoutes = ["/profile/events/create", "/profile/permit"];

  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/");
  }

  if (user?.type === "volunteer" && restrictedRoutes.includes(pathname)) {
    router.push("/profile");
    return;
  }

  const profileMenu = [
    {
      key: "1",
      userType: "all",
      label: (
        <Space>
          <FilePdfOutlined /> Хянах самбар
        </Space>
      ),

      link: "/profile",
    },
    {
      key: "2",
      userType: "all",
      label: (
        <Space>
          <FilePdfOutlined /> Арга хэмжээнүүд
        </Space>
      ),
      link: "/profile/events",
    },
    {
      key: "certificates",
      userType: "volunteer",
      label: (
        <Space>
          <FilePdfOutlined /> Сертификат
        </Space>
      ),
      link: "/profile/certificates",
    },
    {
      key: "3",
      userType: "partner",
      label: (
        <Space>
          <FilePdfOutlined /> Төсөл хөтөлбөрүүд
        </Space>
      ),
      link: "/profile/projects",
    },
    {
      key: "4",
      userType: "partner",
      label: (
        <Space>
          <FilePdfOutlined /> Ирсэн хүсэлтүүд
        </Space>
      ),
      link: "/profile/projects",
    },
    {
      key: "5",
      userType: "all",
      label: (
        <Space>
          <DollarOutlined /> Хандив
        </Space>
      ),
      link: "/profile/donations",
    },
    {
      key: "6",
      userType: "partner",
      label: (
        <Space>
          <SettingOutlined /> Эрх авах
        </Space>
      ),
      link: "/profile/permit",
    },
    {
      key: "7",
      userType: "all",
      label: (
        <Space>
          <SettingOutlined /> Тохиргоо
        </Space>
      ),
      link: "/profile/edit",
    },
  ];

  // Filter the menu based on the user type
  const filteredMenu = profileMenu.filter(
    (item) => item.userType === "all" || item.userType === user.type
  );

  if (userLoading) return "loading";

  return (
    <MainLayout>
      <div className="bg-[#f5f5f5] min-h-screen">
        <ProfileHeader user={user} />

        <div className="container py-6">
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="bg-white p-8 mb-4 rounded-md">
                <List
                  dataSource={filteredMenu}
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

              <AboutMe user={user} />
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

export default ProfileLayout;
