import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ExclamationMark from "../icons/ExclamationMark";
import { Mail, MessageCircle, User2 } from "lucide-react";
import ArrowButton from "../tools/ArrowButton";

const Contact = () => {
  const t = useTranslations("contact");
  return (
    <motion.section id="contact">
      <div className="contact">
        <div
          style={{ margin: "auto 0", paddingBottom: "5rem", maxWidth: "50%" }}
        >
          <div style={{ fontSize: "7rem", display: "flex", gap: "1.5rem" }}>
            <span style={{ paddingTop: ".5rem", whiteSpace: "nowrap" }}>
              Get in touch{" "}
            </span>{" "}
            <ExclamationMark />
          </div>
          <div
            style={{ fontSize: "2rem", marginTop: "1rem", textAlign: "center" }}
          >
            Let’s Build Something!
            <br /> I’m always open to new opportunities, collaborations, or
            interesting ideas. If you’ve got something in mind, let’s talk.
          </div>
        </div>
        <div className="contact-box">
          <div
            style={{ margin: "0 auto", color: "white", marginBottom: "2rem" }}
          >
            Get in touch!
          </div>
          <div className="input-wrapper">
            <User2 style={{ marginTop: ".0rem" }} size={30} color="white" />
            <input
              dir="auto"
              type="text"
              autoCorrect="false"
              placeholder={t("name")}
            />
          </div>
          <div className="input-wrapper">
            <Mail style={{ marginTop: ".0rem" }} size={30} color="white" />
            <input
              dir="auto"
              type="email"
              autoCorrect="false"
              placeholder={t("email")}
            />
          </div>
          <div className="input-wrapper" style={{ marginTop: "1rem" }}>
            <MessageCircle
              style={{ marginTop: ".0rem", marginBottom: "auto" }}
              size={30}
              color="white"
            />
            <textarea
              dir="auto"
              rows={6}
              placeholder={t("message")}
              autoCorrect="false"
            />
          </div>
          <ArrowButton title={t("sendMessage")} />
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
