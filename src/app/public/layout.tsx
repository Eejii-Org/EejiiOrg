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

  return (
    <MainLayout>
      <div className="bg-[#f5f5f5] min-h-screen">
        <ProfileHeader user={user} />
        <div className="container py-6">{children}</div>
      </div>
    </MainLayout>
  );
};

export default PublicProfileLayout;
