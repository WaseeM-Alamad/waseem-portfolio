import { motion } from "framer-motion";

const Caterfy = ({
  onSectionView,
}: {
  onSectionView: (value: string) => void;
}) => {
  return (
    <motion.section
      id="caterfy"
      onViewportEnter={() => onSectionView("caterfy")}
      viewport={{ amount: 0.5 }}
    >
      Caterfy
    </motion.section>
  );
};

export default Caterfy;
