import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  desc: string;
  date: string;
  github: string;
  link?: string;
  logo: string;
  video?: string;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface DialogData {
  title: string | ReactNode;
  message: string | ReactNode;
}