import { motion } from "framer-motion";

const Skills = ({
  onSectionView,
}: {
  onSectionView: (value: string) => void;
}) => {
  return (
    <motion.section
      id="skills"
      onViewportEnter={() => onSectionView("skills")}
      viewport={{ amount: 0.5 }}
    >
      Skills
    </motion.section>
  );
};

export default Skills;
