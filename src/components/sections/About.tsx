import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WaveAnimation from "../tools/WaveAnimation";
import Image from "next/image";

const About = () => {
  const t = useTranslations("sidebar");
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 2,
        }}
      >
        {/* <WaveAnimation text={t("about")} fontSize={80} color="#ebc1ff" /> */}
        <h2>I don’t just build interfaces — I design systems.</h2>
        <div style={{ display: "flex", marginTop: "3rem", gap: "4rem" }}>
          <p style={{ paddingTop: "2rem", fontSize: "30px" }}>
            MindMarket delivers global qualitative market research through real
            people who understand local cultures. We connect you with the voices
            that matter— wherever they are — to help you make smarter, faster
            business decisions with confidence.
          </p>

          <Image
            src="https://picsum.photos/500/600"
            alt=""
            width={500}
            height={600}
            style={{ borderRadius: "2rem", marginTop: "1.5rem" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
