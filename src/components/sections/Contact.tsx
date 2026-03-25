import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import ExclamationMark from "../icons/ExclamationMark";
import ArrowButton from "../tools/ArrowButton";
import TablePhone from "../icons/TablePhone";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import RoundButton from "../tools/RoundButton";
import { ArrowBigDown, Instagram } from "lucide-react";

const Contact = () => {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("contact");
  const ref = useRef(null);
  const phoneRef = useRef(null);
  const leftPanelRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const layer1 = useAnimation();
  const layer2 = useAnimation();
  const box = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    layer1.start({
      scale: 1,
      transition: {
        delay: 0.2,
        type: "tween",
        ease: [0.34, 1.26, 0.64, 1],
        duration: 0.55,
      },
    });
    layer2.start({
      scale: 1,
      transition: {
        delay: 0.3,
        type: "tween",
        ease: [0.34, 1.26, 0.64, 1],
        duration: 0.55,
      },
    });
    box.start({
      opacity: 1,
      transition: {
        delay: 0.68,
        type: "tween",
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.4,
      },
    });
  }, [isInView, box, layer1, layer2]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const box = ref.current;
    const phone = phoneRef.current;
    const leftPanel = leftPanelRef.current;

    gsap.fromTo(
      box,
      {
        y: 55,
        scale: 0.98,
      },
      {
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: box,
          start: "top 120%",
          end: "top -1rem",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      phone,
      {
        scale: 0.97,
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: phone,
          start: "top 120%",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      leftPanel,
      {
        x: isEn ? -15 : 15,
        scale: 0.94,
      },
      {
        x: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: box,
          start: "top 120%",
          end: "top -1rem",
          scrub: true,
        },
      },
    );

    return () => {
      ScrollTrigger.killAll();
    };
  }, [isEn]);

  return (
    <motion.section id="contact">
      <div className="contact">
        <div
          ref={leftPanelRef}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "auto 0",
            paddingBottom: "0rem",
            maxWidth: "50%",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              fontSize: "7.5rem",
            }}
          >
            <motion.span
              initial={{ scale: 0.85, opacity: .9}}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                // delay: 0.1,
                duration: 1.3,
                ease: [0.55, 0, 0.15, 1],
              }}
              style={{ paddingTop: ".5rem", whiteSpace: "nowrap" }}
            >
              {t("letsConnect")}
            </motion.span>
            <svg
              className="lang-flip"
              style={{
                position: "absolute",
                bottom: "-.3rem",
              }}
              width="756"
              height="28"
              viewBox="0 0 756 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d={
                  isEn
                    ? "M10 15.2777C230.452 22.0184 713.089 14.5398 746 10.001"
                    : "M10 14.2777C230.452 21.0184 490.589 14.5398 523.5 10.001"
                }
                stroke="#FF705C"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="1 1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  // delay: 0.1,
                  duration: 1.2,
                  ease: [0.55, 0.6, 0.15, 1],
                }}
              />
            </svg>
          </div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.55, 0, 0.15, 1],
            }}
            style={{ fontSize: "2rem", textAlign: "center" }}
          >
            <br />
            {t("subtitle")}
          </motion.div>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem" }}>
            {/* <RoundButton> <ArrowBigDown/> </RoundButton> */}
            {/* <RoundButton /> */}
            {/* <RoundButton /> */}
          </div>
        </div>
        <div className="bg-img">
          <div className="contact-box-wrapper" ref={ref}>
            <motion.div
              initial={{ scale: 0 }}
              animate={layer1}
              className="cb-layer-1"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={layer2}
              className="cb-layer-2"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={box}
              className="contact-box"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  gap: ".6rem",
                  marginBottom: ".5rem",
                  fontSize: "33px",
                }}
              >
                <span>{t("sendMeAMessage")}</span> <ExclamationMark />
              </div>
              <div className="input-wrapper">
                <label>{t("name")}</label>
                <input
                  dir="auto"
                  type="text"
                  autoCorrect="false"
                  placeholder={t("namePlaceholder")}
                />
              </div>
              <div className="input-wrapper">
                <label>{t("email")}</label>
                <input
                  dir="auto"
                  type="email"
                  autoCorrect="false"
                  placeholder="e.g. john@example.com"
                />
              </div>
              <div className="input-wrapper">
                <label>{t("message")}</label>
                <textarea
                  dir="auto"
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  autoCorrect="false"
                />
              </div>
              <ArrowButton title={t("sendMessage")} />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="table-phone" ref={phoneRef}>
        <TablePhone />
      </div>
    </motion.section>
  );
};

export default Contact;
