"use client";
import React, { useEffect, useState } from "react";
import { myCertificate } from "@/actions";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Font,
  Image,
} from "@react-pdf/renderer";
import { MainLayout } from "@/components";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

// Register the font with react-pdf
Font.register({
  family: "Cormorant Garamond",
  fonts: [
    {
      src: "/assets/fonts/CormorantGaramond-Regular.ttf",
      fontWeight: "normal",
    },
    { src: "/assets/fonts/CormorantGaramond-Bold.ttf", fontWeight: "bold" },
    { src: "/assets/fonts/CormorantGaramond-Italic.ttf", fontStyle: "italic" },
    {
      src: "/assets/fonts/CormorantGaramond-BoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/assets/fonts/Poppins-Light.ttf", fontWeight: 400 },
    { src: "/assets/fonts/Poppins-ExtraLight.ttf", fontWeight: 300 },
  ],
});

Font.register({
  family: "Noticia",
  fonts: [
    { src: "/assets/fonts/NoticiaText-Bold.ttf", fontWeight: "bold" },
    {
      src: "/assets/fonts/NoticiaText-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

function CertificationPreview({ params }: { params: { id: string } }) {
  const [certData, setCertData] = useState();
  const { id } = params;

  useEffect(() => {
    const getMyCertificate = async () => {
      const token = getCookie("token");

      const result = await myCertificate(id, token);

      setCertData(result);
    };

    getMyCertificate();
  }, []);

  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Cormorant Garamond",
      backgroundColor: "#fff7e8",
      position: "relative",
      width: "100px",
      height: "100px",
      color: "#252525",
    },
    pageBackground: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: -1,
    },

    title: {
      position: "absolute",
      top: 62,
      left: 0,
      right: 0,
      fontSize: 54,
      margin: 10,
      padding: 10,
      flexGrow: 1,
      textAlign: "center",
    },

    subTitle: {
      position: "absolute",
      top: 135,
      left: 0,
      right: 0,
      fontSize: 18,
      margin: 10,
      padding: 10,
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: 4,
    },

    name: {
      position: "relative",
      top: 365,
      textAlign: "center",
      fontSize: 44,
    },
    awarded: {
      position: "relative",
      top: 270,

      textAlign: "center",
    },

    awardlabel: {
      textTransform: "uppercase",
      fontSize: 13,
      marginBottom: 2,
    },
    certNumber: {
      fontSize: 11,
    },

    summary: {
      fontFamily: "Poppins",
      position: "absolute",
      top: 430,
      left: 60,
      right: 60,
      fontSize: 13,
      textAlign: "center",
      color: "#555",
      lineHeight: 1.2,
      fontWeight: 300,
    },

    description: {
      fontFamily: "Noticia",
      position: "absolute",
      top: 485,
      left: 120,
      right: 120,
      fontSize: 14,
      textAlign: "center",
      lineHeight: 1.2,
      fontStyle: "italic",
      wordBreak: "keep-all",
      whiteSpace: "normal",
      overflowWrap: "normal" /* Prevent word breaking */,
      maxWidth: "100%" /* Ensure container width doesn't exceed the viewport */,
    },

    date: {
      position: "absolute",
      bottom: 60,
      left: 0,
      right: 0,
      fontSize: 15,
      textAlign: "center",
      lineHeight: 1.2,
    },
  });

  console.log("certData", certData);

  const withHTML = () => {
    return (
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document
          title={certData?.template.organizationName}
          author="eejii.org"
        >
          <Page style={styles.page}>
            <Text style={styles.title}>CERTIFICATE</Text>
            <Text style={styles.subTitle}>
              For volunteer{"\n"}participation
            </Text>
            <Text style={styles.name}>
              {certData?.volunteer.firstName} {certData?.volunteer.lastName}
            </Text>

            <View style={styles.awarded}>
              <Text style={styles.awardlabel}>
                This certificate is awarded to:
              </Text>

              <Text style={styles.certNumber}>
                The certificate number: {certData.number}
              </Text>
            </View>

            <Text style={styles.summary}>
              For outstanding contribution and efforts to the EEJII.ORG
              volunteering and charity foundation and other partner
              organizations.
            </Text>

            <Text style={styles.description}>
              For guiding at the National Trauma and Orthopaedic Research Center
            </Text>

            <Text style={styles.date}>{dayjs().format("MMMM D, YYYY")}</Text>

            <Image
              style={styles.pageBackground}
              src="/assets/certificate/temp-one.jpg"
            />
          </Page>
        </Document>
      </PDFViewer>
    );
  };

  return (
    <MainLayout>
      <div style={{ height: "100vh" }}>{certData && withHTML()}</div>
    </MainLayout>
  );
}

export default CertificationPreview;
