import fs from "fs/promises";
// import { generateDocument } from ".";
import { Field } from "./types";

export async function createPdf(documentName: string) {
  const documentBuffer = await fs.readFile(`./test.json`);
  const document: {
    displayName: string;
    clientPages: { fields: Field[] }[];
    pdfGeneration?: { enable: boolean; baseData: string };
    portalQuestions: Field[];
    askForDoctorSignature: boolean;
    noSigRequired: boolean;
  } = JSON.parse(documentBuffer.toString());
  const fields = document.clientPages.reduce<Field[]>((prev, current) => {
    return [...prev, ...current.fields];
  }, []);
  const baseData = document.pdfGeneration?.baseData ?? "defaultBaseData";
  const isPdfGenerationEnabled = document.pdfGeneration?.enable;
  const documentDisplayName = document.displayName;

  if (isPdfGenerationEnabled) {
    let pdf = await generateDocument(
      [...fields, ...document.portalQuestions],
      documentDisplayName,
      baseData,
      document.askForDoctorSignature,
      document.noSigRequired
    );
    return pdf;
  } else {
    throw Error("PDF generation not enabled");
  }
}
