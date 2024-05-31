import { AuthHeader } from "@/components/auth/auth-header";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
};

export default AuthLayout;
