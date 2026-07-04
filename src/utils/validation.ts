import isEmail from "validator/lib/isEmail";

export const isEmailValid = (email: string) => {
  return email.length <= 254 && isEmail(email);
};

export const isNameValid = (name: string) => {
  return name.length > 2 && name.length <= 100;
};

export const isMessageValid = (msg: string) => {
  return msg.length > 10 && msg.length <= 2000;
};
