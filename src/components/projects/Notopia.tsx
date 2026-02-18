import { motion } from "framer-motion";

const Notopia = () => {
  return (
    <div id="notopia">
      <motion.section
        initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 2,
        }}
      >
        <h1 style={{ color: "var(--color-primary)" }}>Notopia</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque at
          voluptatem officia maxime est optio, eligendi, iure, molestias
          repellendus recusandae consequuntur cumque! Accusamus enim nisi minus
          hic modi dicta fugit!
        </p>
      </motion.section>
    </div>
  );
};

export default Notopia;
