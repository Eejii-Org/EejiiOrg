"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icon, { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { api } from "@/actions";
import DonateModal from "@/components/donate/donateModal";
import {
  Space,
  Button,
  Dropdown,
  List,
  Divider,
  Form,
  Input,
  Popover,
  Select,
  Typography,
  message,
} from "antd";

const { Title } = Typography;

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = () => <Icon component={HeartSvg} />;

const UserGreeting = ({ user, full }: { user: any; full?: boolean }) => {
  const [qpayResult, setQpayResult] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [btnLoading, setBtnLoading] = useState();

  const [openDonatePop, setOpenDonatePop] = useState();

  useEffect(() => {
    if (qpayResult) {
      setIsModalOpen(true);
    }
  }, [qpayResult]);

  const items = [
    {
      label: <Link href="/profile">Миний профайл</Link>,
      key: "profile",
      link: "/profile",
    },
    {
      label: <Link href="/auth/logout">Гарах</Link>,
      key: "logout",
      link: "/auth/logout",
      danger: true,
    },
  ];

  const sendDonate = async (values: string) => {
    setBtnLoading(true);
    const result = await api.post("/api/donate", {
      amount: values.amount,
      method: "qpay",
      email: values.email,
    });

    console.log("result", result);

    if (!result.success) {
      message.warning(result?.message?.message);
      setBtnLoading(false);
      return;
    }

    setQpayResult(result.data?.message?.details);
    setBtnLoading(false);
    setOpenDonatePop(false);
  };

  const DonateForm = () => {
    const [selectedAmount, setSelectedAmount] = useState();
    const amountOptions = [
      {
        label: "5,000₮",
        value: 5000,
      },
      {
        label: "10,000₮",
        value: 10000,
      },
      {
        label: "20,000₮",
        value: 20000,
      },
      {
        label: "50,000₮",
        value: 50000,
      },
      {
        label: "100,000₮",
        value: 100000,
      },
      {
        label: "500,000₮",
        value: 500000,
      },
      {
        label: "Дурын мөнгөн дүн",
        value: "custom",
      },
    ];

    const handleSelectAmount = (val) => {
      setSelectedAmount(val);
    };

    console.log("selectedAmount", selectedAmount);

    return (
      <>
        <Form
          layout="vertical"
          initialValues={{
            amount: 50000,
          }}
          onFinish={sendDonate}
          className="p-3"
        >
          <Title level={5}>Ээжийд хандив илгээх</Title>
          <Divider />
          <Form.Item label="Хандивлах мөнгөн дүнгээ сонгоно уу:" name="amount">
            <Select options={amountOptions} onChange={handleSelectAmount} />
          </Form.Item>
          {selectedAmount === "custom" ? (
            <Form.Item label="Дурын мөнгөн дүн оруулах:">
              <Input placeholder="" />
            </Form.Item>
          ) : null}
          <Form.Item name="email" label="Имэйл хаяг">
            <Input placeholder="имэйл хаягаа оруулна уу ..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={btnLoading}>
              Хандив илгээх
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  const donateBtn = () => {
    return (
      <>
        <Popover content={<DonateForm />} trigger="click">
          <Button type="primary" ghost icon={<HeartIcon />} block>
            Хандив илгээх
          </Button>
        </Popover>

        <DonateModal
          isDonate
          openModal={isModalOpen}
          qpayResult={qpayResult}
          closeModal={() => setIsModalOpen(false)}
        />
      </>
    );
  };

  if (!user)
    return (
      <Space direction={full ? "vertical" : "horizontal"} className="w-full">
        {donateBtn()}

        <Link href="/auth/sign-in">
          <Button
            type="primary"
            icon={<UnlockOutlined />}
            block={full ? true : false}
          >
            Нэвтрэх
          </Button>
        </Link>
      </Space>
    );

  return (
    <div>
      <Space direction={full ? "vertical" : "horizontal"} className="w-full">
        {donateBtn()}
        <Dropdown.Button
          className="invisible md:visible"
          type="primary"
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <Link href="/profile">
            <UserOutlined /> Миний цонх
          </Link>
        </Dropdown.Button>
      </Space>

      <div className="sm:hidden">
        <Divider orientation="left" orientationMargin="0">
          Миний хэсэг
        </Divider>

        <List
          dataSource={items}
          renderItem={(item, idx) => (
            <List.Item key={idx}>{item.label}</List.Item>
          )}
          className="mb-5"
        />
        <Divider orientation="left" orientationMargin="0">
          Үндсэн цэс
        </Divider>
      </div>
    </div>
  );
};

export default UserGreeting;
