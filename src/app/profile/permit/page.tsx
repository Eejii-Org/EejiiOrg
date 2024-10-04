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

  console.log("qpayResult", qpayResult);

  return (
    <div className="">
      <Row gutter={[15, 15]}>
        {permitData.map((item, idx) => (
          <Col span={12} key={idx}>
            <Card>
              <Space direction="vertical">
                <Flex justify="space-between">
                  <Title level={5}>{item?.name}</Title>

                  <div>{item.price}₮</div>
                </Flex>

                <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                <Divider />
                <Button
                  loading={loading}
                  block
                  type="primary"
                  onClick={() => handleBuy(item.code)}
                >
                  Авах
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

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
