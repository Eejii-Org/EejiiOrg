"use client";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getCertificate } from "@/actions";
import { CertificateType } from "@/types";

import { Typography, Divider, Steps, Card, Row, Col } from "antd";
const { Meta } = Card;

const { Text } = Typography;
const { Step } = Steps;

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

const MyCertificates = () => {
  const { user } = useAuth();

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

  console.log("certificateData", certificateData);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Миний Сертификатууд</Title>
      <Divider />

      <Row gutter={[15, 15]}>
        {certificateData.map((item) => {
          return (
            <Col span={6}>
              <Card
                cover={
                  <img alt="example" src="/assets/certificate/pdf-icon.png" />
                }
                actions={[
                  <Link
                    href={`/pdf/certification/${item.template.id}`}
                    target="_blank"
                  >
                    Үзэх/Татах
                  </Link>,
                ]}
              >
                <Meta
                  title={item?.event?.title}
                  description={item?.organizationName}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MyCertificates;
