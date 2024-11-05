"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/providers";
import { api } from "@/actions";
import dayjs from "dayjs";

import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Typography,
  Space,
  Card,
  Row,
  Col,
  Divider,
  Flex,
  Modal,
  Select,
} from "antd";

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
}

const { Title } = Typography;

const ProfilePermit = () => {
  const [permitData, setPermitData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qpayResult, setQpayResult] = useState();
  const [selectedOption, setSelectedOption] = useState<string>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  useEffect(() => {
    const getPermits = async () => {
      const result = await api.get("/api/permits");

      if (!result.success) {
        message.warning(result.message.message);
        return;
      }

      console.log("result", result);

      if (result?.data?.["hydra:member"] as any) {
        setPermitData(result?.data?.["hydra:member"]);
      }
    };

    getPermits();
  }, []);

  useEffect(() => {
    console.log("qpayResult", qpayResult);
    if (qpayResult) {
      setIsModalOpen(true);
    }
  }, [qpayResult]);

  const handleBuy = async (code: string) => {
    setLoading(true);
    const result = await api.post("/api/permits/buy", { permitCode: code });

    console.log("result", result);

    if (!result.success) {
      message.warning(result?.message?.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setQpayResult(result.data?.message);
  };

  const volunteerEventQuantity = () => {
    return permitData
      .filter((item) => item?.type === "volunteering_event")
      .map((item) => ({
        label: `${item.quantity} удаагын эрх`, // Concatenate quantity and price
        value: item?.code,
        price: item?.price,
      }));
  };

  const grantFundraisingQuantity = () => {
    return permitData
      .filter((item) => item?.type === "grant_fundraising")
      .map((item) => ({
        label: `${item.quantity} удаагын эрх`, // Concatenate quantity and price
        value: item?.code,
        price: item?.price,
      }));
  };

  return (
    <div>
      <div>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Flex justify="space-between" className="bg-white p-6 rounded-md">
            <div>
              <Title level={5}>Хандив "өгөх төсөл"</Title>
              Та уг эрхийг авсанаар "Хандив өгөх төсөл" үүсгэх эрхтэй болно
            </div>
            <Space direction="vertical">
              <Select
                options={grantFundraisingQuantity()}
                onChange={(value) => setSelectedOption(value)}
                defaultValue="createGrantProject"
              />
              <Button
                loading={btnLoading}
                block
                type="primary"
                onClick={() => handleBuy(selectedOption)} // Pass the selected option's value
              >
                {selectedOption
                  ? grantFundraisingQuantity().find(
                      (item) => item.value === selectedOption
                    )?.price
                  : "Эрх авах"}
                {/* Show price or default text */}
              </Button>
            </Space>
          </Flex>
          <Flex justify="space-between" className="bg-white p-6 rounded-md">
            <div>
              <Title level={5}>"Сайн дурын ажил" үүсгэх эрх</Title>
              Та уг эрхийг авсанаар "Сайн дурын ажил" үүсгэх эрхтэй болно
            </div>
            <Space direction="vertical">
              <Select
                options={volunteerEventQuantity()}
                onChange={(value) => setSelectedOption(value)}
                defaultValue="createVolunteeringEvent"
              />
              <Button
                loading={btnLoading}
                block
                type="primary"
                onClick={() => handleBuy(selectedOption)} // Pass the selected option's value
              >
                {selectedOption
                  ? volunteerEventQuantity().find(
                      (item) => item.value === selectedOption
                    )?.price
                  : "Эрх авах"}
                {/* Show price or default text */}
              </Button>
            </Space>
          </Flex>
        </Space>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        width={400}
      >
        <Image
          src={`data:image/jpeg;base64,${qpayResult?.qr_image}`}
          width={400}
          height={400}
          alt="Picture of the author"
        />

        <Row gutter={[10, 10]}>
          {qpayResult?.urls?.map((bank, idx) => (
            <Col span={3} key={idx}>
              <a data-app={bank.link}>
                <img
                  src={bank.logo}
                  width={180}
                  height={180}
                  className="rounded-md"
                />
              </a>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default ProfilePermit;
