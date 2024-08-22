"use client";
import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
import { MainLayout } from "@/components";
import { Html } from "react-pdf-html";
import { Table } from "antd";

function Certification() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only render PDFViewer on the client side
    setIsClient(true);
  }, []);

  const dataSource = [
    {
      key: "1",
      id: "1",
      date: 2024,
      cert: "unique number goes here",
    },
    {
      key: "2",
      id: "2",
      date: 2024,
      cert: "date goes here",
    },
  ];

  const columns = [
    {
      title: "Дугаар",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Огноо",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Cert",
      dataIndex: "cert",
      key: "Cert",
    },
  ];

  return (
    <MainLayout>
      <div className="container">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </MainLayout>
  );
}

export default Certification;
