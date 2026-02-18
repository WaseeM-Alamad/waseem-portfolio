import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WaveAnimation from "../tools/WaveAnimation";

const About = () => {
  const t = useTranslations("sidebar");
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 2,
        }}
      >
        <WaveAnimation text={t("about")} fontSize={80} color="#ebc1ff" />
        <p style={{ paddingTop: "2rem" }}>{useTranslations("lorem")("text")}</p>
      </motion.div>
    </section>
  );
};

export default About;
