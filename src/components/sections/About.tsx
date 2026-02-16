import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("sidebar");
  return <motion.section id="about">{t("about")}</motion.section>;
};

export default About;
