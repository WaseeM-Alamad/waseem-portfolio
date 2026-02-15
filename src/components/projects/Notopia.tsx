import { motion } from "framer-motion";

const Notopia = ({
  onSectionView,
}: {
  onSectionView: (value: string) => void;
}) => {
  return (
    <motion.section
      id="notopia"
      onViewportEnter={() => {
        onSectionView("notopia");
      }}
      viewport={{ amount: 0.5 }}
    >
      Notopia
    </motion.section>
  );
};

export default Notopia;
