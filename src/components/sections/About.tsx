import { motion } from "framer-motion";

const About = ({
  onSectionView,
}: {
  onSectionView: (value: string) => void;
}) => {
  return (
    <motion.section
      id="about"
      onViewportEnter={() => onSectionView("about")}
      viewport={{ amount: 0.5 }}
    >
      About
    </motion.section>
  );
};

export default About;
