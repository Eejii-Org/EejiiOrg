import { AuthHeader } from "@/components/auth/auth-header";
import { Row, Col } from "antd";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthHeader />

      <Row>
        <Col span={6} offset={9}>
          <div className="border p-8 rounded-xl bg-white">{children}</div>
        </Col>
      </Row>
    </>
  );
};

export default AuthLayout;
