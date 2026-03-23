import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import ExclamationMark from "../icons/ExclamationMark";
import ArrowButton from "../tools/ArrowButton";
import TablePhone from "../icons/TablePhone";

const Contact = () => {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
          <div style={{ fontSize: "7rem", display: "flex", gap: "1.5rem" }}>
            <span style={{ paddingTop: ".5rem", whiteSpace: "nowrap" }}>
              Get in touch{" "}
            </span>{" "}
          </div>
          <div
            style={{ fontSize: "2rem", marginTop: "1rem", textAlign: "center" }}
          >
            Lets Build Something!
            <br /> I'm always open to new opportunities, collaborations, or
            interesting ideas. If you've got something in mind, let's talk.
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
                <span>Send me a message</span> <ExclamationMark />
              </div>
              <div className="input-wrapper">
                <label>{t("name")}</label>
                <input
                  dir="auto"
                  type="text"
                  autoCorrect="false"
                  placeholder="Someone"
                />
              </div>
              <div className="input-wrapper">
                <label>{t("email")}</label>
                <input
                  dir="auto"
                  type="email"
                  autoCorrect="false"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="input-wrapper">
                <label>{t("message")}</label>
                <textarea
                  dir="auto"
                  rows={4}
                  placeholder="Hello!, i'd like to collab :)"
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
