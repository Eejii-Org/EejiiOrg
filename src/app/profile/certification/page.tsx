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

function Certification() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only render PDFViewer on the client side
    setIsClient(true);
  }, []);

  const htmlContent = `


  <style>
      .cert-body {
      background: green;
      }
    </style>


    <div class="cert-body">
      <h1>Certificate!</h1>
      
     
    </div>
  `;

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff7e8",
      width: "1500px",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      width: "1500px",
    },
  });

  const withHTML = () => {
    return (
      <div style={{ height: "100vh" }}>
        {isClient && (
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <Document title="title goes here">
              <Page>
                <Html>{htmlContent}</Html>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    );
  };

  const native = () => {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>Certificate</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  };

  return <MainLayout>{withHTML()}</MainLayout>;
}

export default Certification;
