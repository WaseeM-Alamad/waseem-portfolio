import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Skills = () => {
  const t = useTranslations("sidebar");

  return <motion.section id="skills">{t("skills")}</motion.section>;
};

export default Skills;
