import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedBurst from "../tools/AnimatedBurst";
import { StandingText } from "../tools/StandingText";
import { useTranslations } from "next-intl";

const Home = () => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const t = useTranslations("home");

  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <motion.section ref={ref} className="home" id="home">
      <motion.div style={{ opacity, scale }}>
        <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
          <StandingText>
            {t("myNameIs")}{" "}
            <div style={{ position: "relative" }}>
              <span style={{ color: "var(--color-primary)" }}>
                {t("WaseeM")}
              </span>
              <AnimatedBurst delay={0.6} size={100} />
            </div>
          </StandingText>
        </h1>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            opacity: { duration: 0.6 },
            type: "spring",
            stiffness: 300,
            damping: 50,
            mass: 2,
          }}
          style={{ textAlign: "center" }}
        >
          I build fast, scalable web applications with real-world architecture.
          <br />
          Full-stack developer focused on performance, clean UI, and thoughtful
          system design. Currently building products that feel simple but are
          technically deep.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Home;
