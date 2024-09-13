"use client";
import { AboutMe, UserStats, ActivityList } from "@/components";
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

  const about = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum ut erat id semper. 
  Duis venenatis luctus varius. Pellentesque tincidunt sit amet urna malesuada placerat. 
  Pellentesque fringilla lectus non ultricies scelerisque. Ut consectetur egestas vestibulum. 
  Sed varius vel augue in efficitur. Proin facilisis metus sit amet eleifend efficitur. 
  Sed a tellus elementum, eleifend eros eget, pulvinar orci. Vestibulum imperdiet, lorem ut 
  pulvinar lacinia, mi diam malesuada libero, a consectetur purus nunc quis urna. 
  Pellentesque mattis interdum massa in.`;

  return (
    <Row gutter={[15, 15]} align="stretch">
      <Col span={12}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <UserStats />
          </Col>
          <Col span={24}>
            <AboutMe bio={about} />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <ActivityList />
      </Col>
    </Row>
  );
};

export default PublicProfile;
