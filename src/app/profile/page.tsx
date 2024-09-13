"use client";

import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getEventUsers } from "@/actions";
import {
  HeartOutlined,
  ClockCircleOutlined,
  FireOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic, Typography, Button, Result } from "antd";
import { ActivityList } from "@/components";

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

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await getEventUsers(token);

      console.log("result", result);

      if (result?.["hydra:member"] as any) {
        setUserEvents(result?.["hydra:member"]);
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
        <ActivityList />
      </Col>
    </Row>
  );
};

export default ProfilePage;
