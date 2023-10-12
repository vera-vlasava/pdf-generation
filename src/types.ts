export type Variant = "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5";

export interface Field {
  pdfOnly?: boolean;
  hideOnPdf?: boolean;
  label?: string;
  value?: string;
  type: string;
  text?: string;
  key: string;
  allowTextBox?: boolean;
  textBoxPlaceholder?: string;
  items?: Choice[];
  subfields?: Field[];
  choices?: Choice[];
  variant?: Variant;
}
export interface Choice {
  label: string;
  value: string;
}

export interface BaseDataPerPractice {
  [key: string]: Field[];
}

export interface Confirmation {
  type: string;
  askForDoctorSignature: boolean;
  portalQuestions: Field[];
}
