"use client";

import { signUp } from "@/actions";
import { UserType } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Antd
import type { FormProps } from "antd";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  Space,
  message,
} from "antd";
const { Title } = Typography;

const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isActiveForm, setIsActiveForm] = useState<boolean>(true);
  const [selectedUserType, setSelectedUserType] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle user type
  const handleUserType = (val: string) => {
    if (!val) return;
    setIsActiveForm(false);
    setSelectedUserType(val);
  };

  // Handle Submit Registration
  const onFinish: FormProps<UserType>["onFinish"] = async (values) => {
    const updatedValues = {
      ...values,
      type: selectedUserType,
    };

    setLoading(true);

    const result = await signUp(updatedValues);

    if (!result.success) {
      message.error(result.message.data);
    } else {
      router.push(`/auth/sign-up/success?email=${values.email}`);
      message.success("Бүртгэл амжилттай");
    }

    console.log("result", result);

    setLoading(false);
  };

  return (
    <Row gutter={10}>
      <Col span={6} offset={9}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={5}>Та эхлээд хэрэглэгчдийн төрлөө сонгоно уу!</Title>
          <Select
            onChange={handleUserType}
            placeholder="Сонгох"
            style={{ width: "100%" }}
          >
            <Select.Option value="volunteer">Сайн дурын ажилтан</Select.Option>
            <Select.Option value="supporter">Дэмжигч</Select.Option>
            <Select.Option value="partner">Хамтрагч</Select.Option>
          </Select>
        </Space>

        <Divider />
        <Form
          form={form}
          layout="vertical"
          disabled={isActiveForm}
          onFinish={onFinish}
        >
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Овог:" name="lastname">
                <Input placeholder="Овогоо оруулна уу..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Нэр:" name="firstName">
                <Input placeholder="Нэрээ оруулна уу..." />
              </Form.Item>
            </Col>
          </Row>

          {selectedUserType !== "volunteer" && (
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item name="organization" label="Байгууллагын нэр:">
                  <Input placeholder="Та байгууллагын нэрээ оруулна уу..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="organizationType" label="Байгууллагын төрөл:">
                  <Input placeholder="Та Байгууллагын төрөлөө оруулна уу..." />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Form.Item
            name="email"
            label="Имэйл:"
            rules={[
              {
                required: true,
                message: "имэйл хаягаа заавал оруулна уу!",
              },
            ]}
          >
            <Input placeholder="Таны имэйл хаяг..." />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Утас:">
            <Input placeholder="Таны утасны дугаар..." />
          </Form.Item>
          <Form.Item
            name="plainPassword"
            label="Нууц үг:"
            rules={[
              {
                required: true,
                message: "Нууц үг оруулна уу!",
              },
            ]}
          >
            <Input placeholder="Нууц үгээ оруулна уу..." />
          </Form.Item>
          <Form.Item
            label="Нууц үг давтах:"
            rules={[
              {
                required: true,
                message: "Нууц үгээ давтан оруулна уу!",
              },
            ]}
          >
            <Input placeholder="Нууц үгээ давтана уу..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Бүртгүүлэх
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

{
  /* TODO: Remove after new implementation */
}
{
  /* <section className="container flex flex-col flex-1 h-full pb-16">
        <div className="flex items-center justify-center">
          {step == 0 ? (
            <UserTypeSelect
              onSelect={(type) => {
                setUserType(type as UserTypes);
                setStep(1);
              }}
            />
          ) : (
            <form
              className="w-full md:min-w-[800px] flex flex-col gap-12 items-center"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target as HTMLFormElement);
                setErrorMessage("");
                if (userType == "volunteer") {
                  if (step == 1) {
                    const email = formData.get("email") as string;
                    const plainPassword = formData.get(
                      "plainPassword"
                    ) as string;
                    const phoneNumber = formData.get("phoneNumber") as string;
                    const username = formData.get("username") as string;
                    setUserDetail({
                      ...userDetail,
                      email,
                      plainPassword,
                      phoneNumber,
                      username,
                    });
                    setStep(step + 1);
                    return;
                  } else if (step == 2) {
                    const firstName = formData.get("firstName") as string;
                    const lastName = formData.get("lastName") as string;
                    const birthday = formData.get("birthday") as string;
                    const gender = formData.get("gender") as GenderType;
                    const registerNumber = formData.get(
                      "registerNumber"
                    ) as string;
                    setUserDetail({
                      ...userDetail,
                      firstName,
                      lastName,
                      gender,
                      registerNumber,
                      birthday,
                    });
                    setStep(step + 1);
                  } else if (step == 3) {
                    const region = formData.get("region") as string;
                    const address = formData.get("address") as string;
                    setUserDetail({
                      ...userDetail,
                      address: {
                        ...userDetail.address,
                        region,
                        address,
                      },
                    });
                    setStep(step + 1);
                  } else {
                    setSignUpLoading(true);
                    const bio = formData.get("bio") as string;
                    const newUser = { ...userDetail, bio };
                    setUserDetail(newUser);
                    try {
                      try {
                        const res = await axios.post(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/volunteer`,
                          {
                            ...newUser,
                          }
                        );
                      } catch (error: any) {
                        throw error?.response?.data;
                      }
                      setSignUpLoading(false);
                      router.push("/auth/sign-up/success");
                    } catch (e) {
                      console.log(e);
                      setSignUpLoading(false);
                      setErrorMessage(
                        "Имэйл бүртгэлтэй байна. Та дараа дахин оролдоно уу."
                      );
                    }
                  }
                } else {
                  if (step == 1) {
                    const organizationType = formData.get(
                      "organizationType"
                    ) as string;
                    setUserDetail({
                      ...userDetail,
                      organizationType,
                    });
                    setStep(step + 1);
                  } else if (step == 2) {
                    const email = formData.get("email") as string;
                    const plainPassword = formData.get(
                      "plainPassword"
                    ) as string;
                    const phoneNumber = formData.get("phoneNumber") as string;
                    const username = formData.get("username") as string;
                    setUserDetail({
                      ...userDetail,
                      email,
                      plainPassword,
                      phoneNumber,
                      username,
                    });
                    setStep(step + 1);
                  } else if (step == 3) {
                    const region = formData.get("region") as string;
                    const address = formData.get("address") as string;
                    setUserDetail({
                      ...userDetail,
                      address: {
                        ...userDetail.address,
                        region,
                        address,
                      },
                    });
                    setStep(step + 1);
                  } else {
                    setSignUpLoading(true);
                    const bio = formData.get("bio") as string;
                    const newUser = {
                      email: userDetail.email,
                      plainPassword: userDetail.plainPassword,
                      phoneNumber: userDetail.phoneNumber,
                      username: userDetail.username,
                      bio: bio,
                      address: userDetail.address,
                      organizationType: userDetail.organizationType,
                    };
                    setUserDetail(newUser);
                    try {
                      try {
                        const res = await axios.post(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/supporter`,
                          {
                            ...newUser,
                          }
                        );
                        console.log(res);
                      } catch (error: any) {
                        throw error?.response?.data;
                      }
                      setSignUpLoading(false);
                      router.push("/auth/sign-up/success");
                    } catch (e) {
                      console.log(e);
                      setSignUpLoading(false);
                      setErrorMessage(
                        "Имэйл бүртгэлтэй байна. Та дараа дахин оролдоно уу."
                      );
                    }
                  }
                }
              }}
            >
              <div className="flex flex-col relative w-full">
                <div className="flex items-center justify-between">
                  {userType &&
                    inputs?.[userType].map(({ label }, index: number) => (
                      <div
                        className={`flex-1 flex flex-col gap-2 items-center ${
                          index + 1 == step ? "flex" : "hidden md:flex"
                        }`}
                        key={index}
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative z-10 ${
                            index + 1 <= step
                              ? "bg-primary text-white"
                              : "bg-backgroundSecondary "
                          }`}
                          key={index}
                        >
                          {index + 1}
                        </div>
                        <label className="text-center">{label}</label>
                      </div>
                    ))}
                </div>
                <div
                  className="absolute w-full top-[26px] h-1"
                  style={{
                    padding: `0px ${100 / (2 * steps)}%`,
                  }}
                >
                  <div
                    className={`bg-backgroundSecondary w-[calc(100%)] h-1`}
                  />
                  <div
                    className={`bg-primary h-1 transition-all -mt-1`}
                    style={{
                      width: Math.floor((100 / (steps - 1)) * (step - 1)) + "%",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:max-w-[600px] w-full">
                {userType == "volunteer" ? (
                  <>
                    {step == 1 ? (
                      <VolunteerStep1 userDetail={userDetail} />
                    ) : step == 2 ? (
                      <VolunteerStep2 userDetail={userDetail} />
                    ) : step == 3 ? (
                      <VolunteerStep3 userDetail={userDetail} />
                    ) : (
                      <VolunteerStep4 userDetail={userDetail} />
                    )}
                  </>
                ) : (
                  <>
                    {step == 1 ? (
                      <SupporterStep1 userDetail={userDetail} />
                    ) : step == 2 ? (
                      <SupporterStep2 userDetail={userDetail} />
                    ) : step == 3 ? (
                      <VolunteerStep3 userDetail={userDetail} />
                    ) : (
                      <VolunteerStep4 userDetail={userDetail} />
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {errorMessage && (
                  <p className="text-red-600 text-md">{errorMessage}</p>
                )}
                <div className="flex flex-row gap-4 w-full md:w-fit">
                  <Button
                    className="border border-primary bg-transparent !text-primary hover:bg-gray-200 flex-1 md:flex-auto md:min-w-64"
                    type="button"
                    onClick={() =>
                      setStep(step == null ? 0 : step == 0 ? step : step - 1)
                    }
                  >
                    Буцах
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 md:flex-auto md:min-w-64"
                  >
                    {step == steps ? "Бүртгүүлэх" : "Үргэлжлүүлэх"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
        <div
          className={`z-50 w-screen h-screen left-0 top-0 absolute bg-black/50 items-center justify-center ${
            signUpLoading ? "flex" : "hidden"
          }`}
        >
          <p className="text-white font-medium text-lg">Loading...</p>
        </div>
      </section> */
}

export default SignUp;
