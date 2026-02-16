import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Notopia = () => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 0%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [500, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [3, 0]);

  const smoothY = useSpring(y, { stiffness: 120, damping: 25 });
  const smoothOpacity = useSpring(opacity, { stiffness: 120, damping: 25 });
  const smoothScale = useSpring(scale, { stiffness: 120, damping: 25 });

  return (
    <div id="notopia">
      <motion.section
        ref={ref}
        style={{
          y: smoothY,
          opacity: smoothOpacity,
          scale: smoothScale,
          rotate: rotate,
        }}
      >
        <h1 style={{ color: "var(--color-primary)" }}>Notopia</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nostrum maxime nobis dolorum sunt ipsam eum, ullam nesciunt beatae ex rerum cum dicta labore dolores. Error tempore sit quas velit.
        </p>
      </motion.section>
    </div>
  );
};

export default Notopia;
