import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Skills = () => {
  const t = useTranslations("sidebar");

  return (
    <motion.section id="skills">
      {t("skills")}
      <p style={{ paddingTop: "2rem" }}>{useTranslations("lorem")("text")}</p>
    </motion.section>
  );
};

export default Skills;
