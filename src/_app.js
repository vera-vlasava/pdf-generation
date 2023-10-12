import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";

export default function MyApp() {
  return (
    <div className="App">
      <PDFViewer>
        <PDFFile />
      </PDFViewer>
    </div>
  );
}

{
  /* <PDFDownloadLink document={<PDFFile />} fileName="Test">
{({ loading }) =>
  loading ? <div>Loading Document...</div> : <button>Download</button>
}
</PDFDownloadLink> */
}
