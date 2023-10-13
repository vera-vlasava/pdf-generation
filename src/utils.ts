import fs from "fs/promises";
import { generateDocument } from "./PdfFile";
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
  const documentDisplayName = document.displayName;

  let pdf = await generateDocument(
    [...fields, ...document.portalQuestions],
    documentDisplayName
  );
  return pdf;
}
