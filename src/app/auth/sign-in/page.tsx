"use client";
import { UserType } from "@/types";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useAuth } from "@/providers";
import { signIn } from "@/actions";

// Antd
import type { FormProps } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Divider, Typography, message, Space } from "antd";

const { Title } = Typography;

const SignIn = () => {
  const { getUser } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Submit Registration
  const onFinish: FormProps<UserType>["onFinish"] = async (values) => {
    setLoading(true);
    const result = await signIn(values);

    if (!result.token) {
      message.error(result.message);
    } else {
      message.success("Амжилттай нэвтэрлээ...");
      setCookie("token", result.token);
      getUser();
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <Form form={form} name="login" layout="vertical" onFinish={onFinish}>
      <Title level={4}>Хэрэглэгч нэвтрэх</Title>
      <Divider />
      <Form.Item
        name="email"
        label="Таны имэйл:"
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Таны имэйл хаяг..." />
      </Form.Item>

      <Form.Item
        name="password"
        label="Нууц үг:"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Нууц үгээ оруулна уу..."
        />
      </Form.Item>
      <Form.Item>
        <Link href="#">Нууц үгээ мартсан!</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Нэвтрэх
        </Button>
      </Form.Item>

      <Link href="/auth/sign-up">
        <Button type="primary" ghost block>
          Бүртгүүлэх
        </Button>
      </Link>
    </Form>
  );
};

// <section className="container flex flex-col flex-1 justify-center h-full pb-48">
//       <div className="flex flex-col xs:items-center justify-center gap-4">
//         <form
//           ref={ref}
//           action={async (formData) => {
//             ref.current?.reset();
//             try {
//               setErrorMessage("");
//               const email = formData.get("email");
//               const password = formData.get("password");
//               const { data } = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
//                 {
//                   email,
//                   password,
//                 }
//               );
//               setCookie("token", data.token);
//               getUser();
//               router.push("/");
//             } catch (e: any) {
//               setErrorMessage(
//                 e.response.status == "401"
//                   ? "И-мэйлээ баталгаажуулна уу"
//                   : "Таны оруулсан и-мэйл эсвэл нууц үг буруу байна."
//               );
//             }
//           }}
//           className="flex flex-col gap-3 xs:max-w-[364px] xs:w-[364px]"
//         >
//           <Input
//             // label="Имэйл"
//             name="email"
//             placeholder="Имэйл"
//             type="email"
//             autoComplete="email"
//             required
//           />
//           <Input
//             // label="Нууц үг"
//             name="password"
//             placeholder="Нууц үг"
//             type="password"
//             autoComplete="current-password"
//             required
//           />
//           <div className="flex flex-col gap-2 justify-center text-center">
//             {errorMessage && (
//               <p className="text-red-600 text-sm">{errorMessage}</p>
//             )}
//             <SignInButton />
//           </div>
//         </form>
//         <div className="flex flex-col gap-3 xs:max-w-[364px] xs:w-[364px]">
//           <Link
//             href="/auth/forgot-password"
//             className="text-md underline text-center text-primary"
//           >
//             Нууц Үг Мартсан?
//           </Link>
//           <hr color="red" className="w-full my-2" />
//           <Button
//             className="border border-primary bg-transparent !text-primary hover:bg-gray-200"
//             onClick={() => router.push("/auth/sign-up")}
//           >
//             Бүртгүүлэх
//           </Button>
//         </div>
//       </div>
//     </section>

export default SignIn;
