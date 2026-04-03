export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
