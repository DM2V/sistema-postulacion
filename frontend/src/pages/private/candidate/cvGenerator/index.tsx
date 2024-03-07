import React, { useRef } from "react";
import PdfTemplate from "./template";
import { PDFViewer } from "@react-pdf/renderer";

const PdfGenerator = () => {
  return (
    <div>
      {/* <PDFViewer width="100%" height="1000"> */}
      <PdfTemplate />

      {/* </PDFViewer> */}
    </div>
  );
};

export default PdfGenerator;
