import { AuthHeader } from "@/components/auth/auth-header";
import { Row, Col } from "antd";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <AuthHeader />
      <Row justify="space-around">
        <Col flex="480px">
          <div className="border p-8 rounded-xl bg-white shadow-sm">
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
