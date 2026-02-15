import { motion } from "framer-motion";

const Contact = ({
  onSectionView,
}: {
  onSectionView: (value: string) => void;
}) => {
  return (
    <motion.section
      id="contact"
      onViewportEnter={() => onSectionView("contact")}
      viewport={{ amount: 0.5 }}
    >
      Contact
    </motion.section>
  );
};

export default Contact;
