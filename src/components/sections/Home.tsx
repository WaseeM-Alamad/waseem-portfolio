import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedBurst from "../tools/AnimatedBurst";
import { useTranslations } from "next-intl";
import OutlinedButton from "../buttons/OutlinedButton";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";

const Home = () => {
  const t = useTranslations("home");
  const { scrollTo } = useSmoothScroll();

  const ref = useRef<HTMLElement | null>(null);

  return (
    <motion.section ref={ref} className="home" id="home">
      <motion.div
        style={{
          position: "relative",
          // opacity,
          // scale,
        }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.55, 0, 0.15, 1],
            opacity: { duration: 0.6, ease: "easeOut" },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "7rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "1.5rem",
              width: "fit-content",
              whiteSpace: "nowrap"
            }}
          >
            <span style={{ position: "relative" }}>
              <AnimatedBurst size={130} delay={0.52} />
              {t("crafting")}
            </span>
            <br />
            {t("interactive")}
            <br /> {t("webExperiences")}
          </div>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.55, 0, 0.15, 1],
            }}
            style={{
              whiteSpace: "pre-line",
              textAlign: "center",
              fontSize: "1.6rem",
              fontWeight: "600",
            }}
          >
            {t("homeDesc")}
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.55, 0, 0.15, 1],
            }}
            className="home-btns"
          >
            <OutlinedButton onClick={() => scrollTo("#notopia")}>
              {t("myWork")}
            </OutlinedButton>
            <OutlinedButton onClick={() => scrollTo("#contact")}>
              {t("contactMe")}
            </OutlinedButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
