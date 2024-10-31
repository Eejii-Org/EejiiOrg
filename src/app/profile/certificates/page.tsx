"use client";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getCertificate } from "@/actions";
import { CertificateType } from "@/types";
import { api } from "@/actions";
import {
  Typography,
  Divider,
  Empty,
  Card,
  Row,
  Col,
  Flex,
  Button,
  Skeleton,
} from "antd";
const { Meta } = Card;

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

const truncateText = (text: string) => {
  const maxLength = 25;
  return text?.length > maxLength
    ? text?.substring(0, maxLength) + "..."
    : text;
};

const MyCertificates = () => {
  const { user } = useAuth();
  const isVolunteer = user?.type === "volunteer";
  const [certificateData, setCertificateData] = useState();

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      let result;

      if (!isVolunteer) {
        result = await api.get("/api/events/certificateTemplates/");
        setCertificateData(result?.data);
      } else {
        result = await getCertificate(token);
        if (result?.["hydra:member"] as any) {
          setCertificateData(result?.["hydra:member"]);
        }
      }
    };

    fetchCertificateData();
  }, [user]);

  const RednerList = () => {
    if (!certificateData.length) {
      return <Empty />;
    }
    return (
      <Row gutter={[15, 15]}>
        {certificateData.map((item, idx) => {
          return (
            <Col span={6} key={idx}>
              <Card
                cover={
                  <img alt="example" src="/assets/certificate/pdf-icon.png" />
                }
                actions={[
                  !isVolunteer ? (
                    <Link
                      href={`/profile/certificates/edit?slug=${item?.slug}`}
                      key={`link-volunteer-${item?.slug}`}
                    >
                      Засах
                    </Link>
                  ) : (
                    <Link
                      href={`/pdf/certification/${item?.number}`}
                      target="_blank"
                      key={`link-${item?.number}`}
                    >
                      Татах
                    </Link>
                  ),
                ]}
              >
                <Meta
                  title={
                    isVolunteer
                      ? truncateText(item?.event.title)
                      : truncateText(item?.title)
                  }
                  description={
                    isVolunteer
                      ? truncateText(item?.template?.organizationName)
                      : truncateText(item?.organizationName)
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>
          {isVolunteer ? "Миний Сертификатууд" : "Үүсгэсэн сертификатууд"}
        </Title>
        <Button type="primary">
          <Link href="/profile/certificates/create">Шинээр үүсгэх</Link>
        </Button>
      </Flex>

      <Divider />

      {!certificateData ? <Skeleton active /> : <RednerList />}
    </div>
  );
};

export default MyCertificates;
