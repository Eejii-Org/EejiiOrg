"use client";
import {
  MainLayout,
  ProfileHeader,
  EventList,
  ActivityList,
  DonationList,
} from "@/components";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCertificate } from "@/actions";
import dayjs from "dayjs";

import {
  HeartOutlined,
  ClockCircleOutlined,
  FireOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Tabs,
  Statistic,
  Typography,
  Button,
  Tag,
  Space,
  Table,
  Flex,
  Result,
  List,
  Avatar,
  Progress,
  Divider,
} from "antd";

const { Title } = Typography;

// Empty Bio alert

const EmptyBio = () => {
  return (
    <Result
      status="warning"
      subTitle="Та өөрийн миний тухай хэсгийг оруулна уу."
      extra={[
        <Button type="primary" key="console">
          Засах
        </Button>,
      ]}
    />
  );
};

const PublicProfile = () => {
  const { user, userLoading } = useAuth();
  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await getCertificate(token);

      if (result?.["hydra:member"] as any) {
        setCertificateData(result?.["hydra:member"]);
      }
    };

    fetchCertificateData();
  }, [user]);

  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/");
  }

  const data = [
    {
      title:
        "For guiding at the National Trauma and Orthopaedic Research Center",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <Row gutter={[15, 15]}>
      <Col span={6}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Сайн дурын ажил"
          value={4}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<FireOutlined />}
        />
      </Col>
      <Col span={6}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Зарцуулсан цаг"
          value={13}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ClockCircleOutlined />}
        />
      </Col>
      <Col span={6}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Идэвх"
          value={90}
          precision={2}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Col>
      <Col span={6}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Хандив"
          value="₮20,000"
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<HeartOutlined />}
        />
      </Col>

      <Col span={24}>
        <div className="bg-white p-6 rounded-md">
          <Title level={5}>Батламжууд</Title>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<Title level={5}>{item.title}</Title>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
      </Col>
    </Row>
  );
};

export default PublicProfile;
