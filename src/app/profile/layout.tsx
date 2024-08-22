import { AuthHeader } from "@/components/auth/auth-header";
import { Row, Col } from "antd";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-slate-100 min-h-screen">{children}</div>;
};

export default ProfileLayout;
