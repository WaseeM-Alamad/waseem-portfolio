import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WaveAnimation from "../tools/WaveAnimation";

const Contact = () => {
  const t = useTranslations("sidebar");
  return (
    <motion.section id="contact">
      <div>
        <div style={{fontSize: "7rem"}}>Contact me</div>
      </div>
      <div
        style={{
          width: "30rem",
          height: "40rem",
          backgroundColor: "#ff705c",
          borderRadius: "2rem",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        hi
      </div>
    </motion.section>
  );
};

export default Contact;
