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
      <Row justify="space-around">
        <Col flex="480px">
          <div className="border p-8 rounded-xl bg-white">{children}</div>
        </Col>
      </Row>
    </>
  );
};

export default AuthLayout;
