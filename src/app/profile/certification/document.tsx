// src/PdfDocument.js
import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";

const PdfDocument = ({ htmlContent }) => (
  <Document>
    <Page>
      <Html>{htmlContent}</Html>
    </Page>
  </Document>
);

export default PdfDocument;
