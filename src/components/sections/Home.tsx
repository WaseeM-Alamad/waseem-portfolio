import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedBurst from "../tools/AnimatedBurst";
import { useTranslations } from "next-intl";
import OutlinedButton from "../buttons/OutlinedButton";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";
import FlyingPlane from "../tools/AnimatedPlane";

const Home = () => {
  const t = useTranslations("home");
  const { scrollTo } = useSmoothScroll();

  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section ref={ref} className="home" id="home">
      <motion.div
        style={{
          position: "relative",
          opacity,
          scale,
        }}
      >
        <FlyingPlane/>
        <svg
          style={{ position: "absolute", left: "-26%", top: "0" }}
          width="141"
          height="94"
          viewBox="0 0 141 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.5 0C91.8849 0 109.715 15.2455 113.71 35.4553C128.927 36.5422 141 49.115 141 64.625C141 80.84 127.84 94 111.625 94H35.25C15.7744 94 0 78.2256 0 58.75C0 40.5669 13.7772 25.6147 31.4316 23.7053C38.8048 9.6349 53.5214 0 70.5 0Z"
            fill="#F4F4F4"
          />
        </svg>
        <svg
          style={{ position: "absolute", right: "-30%", top: "40%" }}
          width="141"
          height="94"
          viewBox="0 0 141 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.5 0C91.8849 0 109.715 15.2455 113.71 35.4553C128.927 36.5422 141 49.115 141 64.625C141 80.84 127.84 94 111.625 94H35.25C15.7744 94 0 78.2256 0 58.75C0 40.5669 13.7772 25.6147 31.4316 23.7053C38.8048 9.6349 53.5214 0 70.5 0Z"
            fill="#F4F4F4"
          />
        </svg>
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
            <OutlinedButton onClick={() => scrollTo("#contact")}>
              Contact
            </OutlinedButton>
            <OutlinedButton onClick={() => scrollTo("#notopia")}>
              My projects
            </OutlinedButton>
          </motion.div>
        </motion.div>
      </motion.div>

    </motion.section>
  );
};

export default Home;
