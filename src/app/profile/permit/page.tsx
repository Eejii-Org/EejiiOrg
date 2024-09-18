"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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

  const handleBuy = async (code: string) => {
    const result = await api.get("/api/banners/buyAd", code);

    if (!result.success) {
      message.warning(result?.message?.message);
    }
  };

  const PermitCards = () => {
    permitData.map((item, idx) => (
      <Card
        key={idx}
        title={item?.name}
        bordered={false}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    ));
  };

  return (
    <div className="">
      <Row gutter={[15, 15]}>
        {permitData.map((item, idx) => (
          <Col span={12}>
            <Card key={idx}>
              <Space direction="vertical">
                <Flex justify="space-between">
                  <Title level={5}>{item?.name}</Title>

                  <div>{item.price}₮</div>
                </Flex>

                <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                <Divider />
                <Button
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
    </div>
  );
};

export default ProfilePermit;
