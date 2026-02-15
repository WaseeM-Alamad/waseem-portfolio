import { motion } from "framer-motion";

const Home = ({ onSectionView }: { onSectionView: (value: string)=> void }) => {
  return (
    <motion.section
      id="home"
      onViewportEnter={() => onSectionView("home")}
      viewport={{ amount: 0.5 }}
    >
      Home
    </motion.section>
  );
};

export default Home;
