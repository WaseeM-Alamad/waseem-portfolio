import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import ExclamationMark from "../icons/ExclamationMark";
import ArrowButton from "../tools/ArrowButton";
import TablePhone from "../icons/TablePhone";

const Contact = () => {
  const t = useTranslations("contact");
  const ref = useRef(null);
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
  }, [isInView]);

  return (
    <motion.section id="contact">
      <div className="contact">
        <div
          className="left-panel"
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
              fontSize: "7rem",
              // gap: "1.5rem",
            }}
          >
            <span style={{ paddingTop: ".5rem", whiteSpace: "nowrap" }}>
              {t("letsConnect")}
            </span>{" "}
            <svg
              className="lang-flip"
              style={{
                position: "absolute",
                bottom: "-.3rem",
              }}
              width="675"
              height="27"
              viewBox="0 0 675 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M8 16.7754C228.452 23.5161 633.193 12.5395 666.104 8.00067"
                stroke="#FF705C"
                strokeWidth="16"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1,
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
            <br/>
            {t("subtitle")}
          </motion.div>
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
                  placeholder="مثال: محمد صلاح"
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
      <div className="table-phone">
        <TablePhone />
      </div>
    </motion.section>
  );
};

export default Contact;
