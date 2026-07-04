"use server";
import { ContactForm } from "@/types/types";
import { Resend } from "resend";
import { isEmailValid, isMessageValid, isNameValid } from "./validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailAction = async (form: ContactForm) => {
  const email = form.email.trim();
  const message = form.message.trim();
  const name = form.name.trim();

  if (!isMessageValid(message) || !isEmailValid(email) || !isNameValid(name)) {
    return {
      success: false,
      error: "One or more fields are invalid",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <contact@waseem-alamad.info>",
      to: "waseemalamad@gmail.com",
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
    <h2>New Portfolio Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return { success: true };
  } catch (err) {
    console.error("Failed to send message.", err);
    return {
      success: false,
      error: "Failed to send message.",
    };
  }
};
