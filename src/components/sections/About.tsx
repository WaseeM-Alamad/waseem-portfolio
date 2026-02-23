import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import WaveAnimation from "../tools/WaveAnimation";
import { useRef } from "react";

const About = () => {
  const t = useTranslations("sidebar");

  const points = [
    "I’m a Full-Stack Developer based in Jordan. I build scalable and mobile applications with a strong focus on performance, structure, and clean architecture.",
    "I’ve engineered complex systems from scratch — building custom masonry layouts, drag-and-drop interactions, optimized ordering logic, and tailored virtualization strategies designed to handle large datasets efficiently.",
    "I care about how applications behave under real usage — how data flows, how components scale, and how interactions feel. My goal is to build products that are fast, predictable, and built to last.",
    "On the backend, I design structured APIs, manage databases, and implement secure data flows with a focus on scalability and clarity. I work with Node.js, MongoDB, and Supabase to build reliable systems that handle authentication, storage, and real-time updates efficiently.",
  ];

  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, .8], [250, 0]);
  const rotate = useTransform(scrollYProgress, [0, .8], [10, 0]);

  return (
    <section ref={ref} id="about">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 2,
        }}
        style={{ marginBottom: "1.5rem" }}
      >
        {" "}
        Waseem Alamad{" "}
      </motion.h2>
      <div
        style={{
          display: "flex",
          gap: "4rem",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <div className="about-text-wrapper">
          {points.map((point) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 2,
              }}
              className="about-point"
              key={point}
            >
              <svg
                style={{ flexShrink: 0 }}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M21.9596 11.6819L23.5914 14.8335C23.8391 15.3015 24.2908 15.6305 24.8153 15.7037L28.261 16.179C30.1041 16.4349 30.8179 18.7237 29.4557 19.9961L27.0954 22.1897C26.6875 22.57 26.498 23.133 26.6 23.6814L27.1755 26.8989C27.4961 28.6904 25.6457 30.0871 24.0212 29.2681L20.7285 27.6228C20.2696 27.3961 19.7304 27.3961 19.2715 27.6228L15.9788 29.2681C14.3543 30.0798 12.5039 28.6904 12.8245 26.8989L13.4 23.6814C13.502 23.133 13.3125 22.57 12.9046 22.1897L10.5443 19.9961C9.18206 18.731 9.89597 16.4349 11.739 16.179L15.1847 15.7037C15.7092 15.6305 16.1682 15.3088 16.4086 14.8335L18.0404 11.6819C18.8709 10.0951 21.1364 10.0951 21.9596 11.6819Z"
                  fill="var(--home-comp-color)"
                />
              </svg>

              <p>{point}</p>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y,  rotate }}>
          <Image
            src="https://picsum.photos/500/703"
            alt=""
            width={500}
            height={700}
            style={{ borderRadius: "2rem" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
