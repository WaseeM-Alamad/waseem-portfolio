import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("sidebar");
  return (
    <motion.section id="contact">
      <span style={{ color: "var(--color-primary)" }}>
        {useTranslations("lorem")("text")}
      </span>
    </motion.section>
  );
};

export default Contact;
