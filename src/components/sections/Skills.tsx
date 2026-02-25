import { motion} from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const Skills = () => {
  const t = useTranslations("sidebar");

  const cards = [
    "Frontend Engineering",
    "Backend & Data",
    "Mobile Development",
    "Engineering Principles",
  ];

  const ref = useRef<HTMLElement | null>(null);

  return (
    <motion.section style={{ paddingTop: "4rem" }} ref={ref} id="skills">
    </motion.section>
  );
};

export default Skills;
