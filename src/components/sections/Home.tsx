import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedBurst from "../tools/AnimatedBurst";
import { useTranslations } from "next-intl";
import OutlinedButton from "../buttons/OutlinedButton";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";
import { useGlobalContext } from "@/contexts/GlobalContext";

const Home = () => {
  const { isAr } = useGlobalContext();
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
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "1.5rem",
              width: "fit-content",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ position: "relative" }}>
              <AnimatedBurst size={130} delay={0.52} />
              {t("crafting")}
            </span>
            <br />
            {t("interactive")}
            <br />{" "}
            <span
              style={{
                fontSize: `clamp(${isAr ? " 3.5rem" : "2.8rem"}, 10vw, 7rem)`,
              }}
            >
              {" "}
              {t("webExperiences")}
            </span>
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
              // whiteSpace: "pre-line",
              textAlign: "center",
              // fontSize: "1.6rem",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              fontWeight: "600",
              maxWidth: "50rem",
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
              <span
                style={{ display: "flex", fontSize: "clamp(1.3rem, 4vw, 2rem)" }}
              >
                {t("myWork")}
              </span>
            </OutlinedButton>
            <OutlinedButton onClick={() => scrollTo("#contact")}>
              <span
                style={{ display: "flex", fontSize: "clamp(1.3rem, 4vw, 2rem)" }}
              >
                {t("contactMe")}
              </span>
            </OutlinedButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
