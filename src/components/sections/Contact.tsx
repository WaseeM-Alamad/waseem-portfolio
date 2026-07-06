import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ExclamationMark from "../icons/ExclamationMark";
import ArrowButton from "../tools/ArrowButton";
import TablePhone from "../icons/TablePhone";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import OutlinedButton from "../buttons/OutlinedButton";
import Github from "../icons/Github";
import LinkedIn from "../icons/LinkedIn";
import Instagram from "../icons/Instagram";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { sendEmailAction } from "@/utils/actions";
import { isEmailValid, isMessageValid, isNameValid } from "@/utils/validation";
import { useDialog } from "@/contexts/DialogContext";
import { DialogData } from "@/types/types";

const resultDialogContent = (fail: boolean = false): DialogData => {
  return {
    title: (
      <div style={{ textAlign: "center" }}>
        {fail ? (
          <svg
            width="96"
            height="116"
            viewBox="0 0 136 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.3093 0.893683C58.18 0.55366 60.2464 0.189635 60.906 0.0936283C61.5655 -0.00637864 65.3427 -0.0303803 69.2998 0.0416247C73.8205 0.12163 77.6857 0.40965 79.6922 0.813678C81.4509 1.1697 84.8684 2.00976 87.2867 2.68181C89.7768 3.37385 93.9378 4.98197 96.8796 6.39806C99.7375 7.77016 103.515 9.8543 105.273 11.0344C107.032 12.2105 109.818 14.2866 111.469 15.6507C113.116 17.0148 115.906 19.659 117.664 21.5311C119.423 23.4032 122.101 26.7115 123.616 28.8876C125.135 31.0638 127.501 35.096 128.884 37.8442C130.263 40.5924 131.946 44.6447 132.621 46.8449C133.297 49.045 134.22 52.5572 134.672 54.6454C135.124 56.7335 135.651 60.5178 135.847 63.046C136.051 65.7061 136.051 69.6704 135.847 72.4466C135.651 75.0868 135.216 78.599 134.876 80.2472C134.536 81.8953 133.737 85.0475 133.101 87.2476C132.466 89.4478 131.586 92.148 131.151 93.248C130.711 94.3481 129.636 96.6883 128.756 98.4484C127.877 100.209 125.89 103.541 124.34 105.849C122.793 108.157 120.231 111.489 118.648 113.249C117.069 115.01 114.491 117.582 112.924 118.97C111.353 120.354 108.271 122.718 106.073 124.218C103.875 125.718 100.549 127.714 98.6783 128.65C96.8077 129.583 94.3815 130.707 93.2823 131.147C92.1831 131.583 89.485 132.463 87.2867 133.099C85.0883 133.735 81.9426 134.535 80.2918 134.875C78.645 135.215 75.1356 135.651 72.4975 135.847C69.7235 136.051 65.7624 136.051 63.1044 135.847C60.5782 135.651 56.797 135.123 54.7105 134.671C52.624 134.219 49.1146 133.291 46.9162 132.607C44.7178 131.927 40.7607 130.287 38.1226 128.963C35.4846 127.638 31.5275 125.326 29.3291 123.826C27.1307 122.322 23.8011 119.674 21.9345 117.938C20.0679 116.206 17.3538 113.361 15.9029 111.617C14.456 109.873 12.3095 107.009 11.1304 105.249C9.95126 103.489 7.87678 99.7085 6.51777 96.8483C4.9709 93.6001 3.50398 89.6958 2.60463 86.4476C1.81321 83.5874 0.873901 79.1751 0.510167 76.6469C0.0265207 73.2587 -0.0893945 70.4105 0.0624944 65.8462C0.174412 62.4339 0.57412 58.1176 0.945848 56.2455C1.31758 54.3734 2.25289 50.6851 3.02033 48.0449C3.78777 45.4048 5.35462 41.2645 6.50578 38.8443C7.65294 36.4241 9.86332 32.5559 11.4142 30.2437C12.9651 27.9315 15.5751 24.5113 17.2139 22.6432C18.8527 20.7751 21.7107 17.9629 23.5613 16.4028C25.4159 14.8386 28.7295 12.3785 30.9279 10.9304C33.1263 9.48228 36.8116 7.39813 39.1219 6.30606C41.4322 5.20998 45.4773 3.68588 48.1153 2.91382C50.7534 2.14177 54.4387 1.23371 56.3093 0.893683Z"
              fill="#FF0057"
            />
            <path
              d="M62.0211 22.3432C62.285 21.8511 63.0444 21.0871 63.7039 20.647C64.6352 20.027 65.5746 19.847 67.9008 19.847C70.1992 19.847 71.2024 20.031 72.1977 20.643C72.9132 21.0831 73.7685 22.0271 74.1043 22.7432C74.6479 23.9113 74.6199 27.0515 73.8045 53.8613C72.9891 80.6232 72.8252 83.7914 72.1977 84.7635C71.814 85.3595 71.0026 86.1516 70.399 86.5196C69.7755 86.9036 68.6083 87.1636 67.701 87.1276C66.8216 87.0876 65.6985 86.7876 65.2028 86.4516C64.7072 86.1195 64.0317 85.3075 63.7039 84.6474C63.2163 83.6754 62.9525 78.599 62.3049 57.7456C61.8653 43.6086 61.5135 30.0637 61.5215 27.6435C61.5295 24.9793 61.7254 22.8872 62.0211 22.3432Z"
              fill="white"
            />
            <path
              d="M61.6055 101.677C62.3209 100.813 63.624 99.7725 64.5033 99.3645C65.6385 98.8364 66.8136 98.6564 68.5644 98.7364C70.5429 98.8244 71.3543 99.0844 72.7253 100.049C73.6606 100.709 74.7558 101.881 75.1595 102.649C75.5632 103.421 76.0109 104.949 76.1548 106.049C76.3187 107.301 76.2148 108.797 75.875 110.049C75.5073 111.397 74.8038 112.581 73.7126 113.681C72.4975 114.914 71.5822 115.43 69.9993 115.782C68.8442 116.042 67.3173 116.134 66.6018 115.994C65.8863 115.85 64.8551 115.514 64.3035 115.242C63.7559 114.97 62.6607 114.049 61.8733 113.197C60.862 112.105 60.3024 111.001 59.9627 109.449C59.6149 107.853 59.5949 106.701 59.8947 105.249C60.1465 104.033 60.818 102.633 61.6055 101.677Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="175"
            height="100"
            viewBox="0 0 175 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7328 15.2987C20.1547 14.5736 21.2691 13.6732 22.2163 13.3067C23.1715 12.9482 47.2265 12.6454 127.423 12.6294L126.93 15.984C126.659 17.8246 126.746 20.8525 127.129 22.717C127.511 24.5816 128.315 27.0915 128.92 28.2947C129.524 29.4979 130.615 31.0198 131.339 31.6811C132.072 32.3425 132.669 33.0516 132.661 33.2747C132.661 33.4979 124.852 39.3703 115.316 46.3424C105.772 53.3065 95.822 60.6212 93.1953 62.5814C89.661 65.2268 88.085 65.9758 87.1218 65.4579C86.4134 65.0674 71.0666 53.8165 53.0134 40.446C34.9681 27.0756 19.9238 16.2549 19.5895 16.3904C19.2472 16.5179 19.3189 16.0318 19.7328 15.2987Z"
              fill="#FFE8FC"
            />
            <path
              d="M18.9445 96.0314L18.9447 56.685L19.1199 17.9441L21.5317 19.8884C22.861 20.9561 34.8647 29.8405 48.2135 39.6253C61.5624 49.4181 72.4038 57.6412 72.2924 57.9041C72.1889 58.1591 62.6927 64.8921 51.2065 72.8522C39.7123 80.8203 27.8915 89.7605 18.9445 96.0314Z"
              fill="#FFE8FC"
            />
            <path
              d="M98.4329 61.9599C98.4329 61.7447 106.393 55.7527 116.112 48.6532C125.839 41.5536 134.149 35.721 134.587 35.697C135.025 35.6731 136.816 36.3743 138.567 37.2588C140.828 38.3982 143.311 38.8683 147.124 38.8604C150.077 38.8604 153.301 38.5337 156.079 37.45L155.681 67.665C155.339 93.386 152.147 99.0912 151.128 99.6967C150.244 100.215 147.586 95.6888 132.597 85.4976C121.429 77.904 109.179 69.5933 105.366 67.0276C101.545 64.4618 98.4329 62.183 98.4329 61.9599Z"
              fill="#FFE8FC"
            />
            <path
              d="M19.3077 96.7645C17.5724 95.625 20.4492 97.2027 46.8285 78.7327C61.825 68.2387 74.5371 59.8164 75.0863 60.0077C75.6356 60.2069 78.7638 62.3423 88.0213 69.1311L95.9812 63.5535L150.029 99.6967L86.3338 99.9916C31.6011 100.159 20.8599 97.7923 19.3077 96.7645Z"
              fill="#FFE8FC"
            />
            <path
              d="M19.3029 18.3266C19.3029 17.96 18.9447 16.7808 19.3029 16.4939C19.5178 16.1672 20.1863 16.0717 20.6719 16.4462C21.1495 16.8286 36.146 27.9361 53.9843 41.1393C71.8225 54.3424 86.9624 65.3224 87.6152 65.5455C88.2758 65.7686 91.2051 64.1511 94.1821 61.928C97.1353 59.7209 107.077 52.4301 116.271 45.7209C130.297 35.4819 132.482 32.8126 133.653 33.5457C134.775 34.2548 135.555 35.2349 134.648 35.5536C134.027 35.7687 126.348 42.5337 116.701 49.5456C107.053 56.5575 98.4248 61.7368 98.4168 61.9599C98.4089 62.175 110.755 70.6929 125.847 80.8841C140.939 91.0753 151.414 98.7246 151.414 99.1629C151.414 99.6011 150.786 99.8402 150.021 99.6967C149.257 99.5533 138.233 92.1669 95.9731 63.5535L88.0132 69.1312L82.2422 64.9001C79.0662 62.5734 76.0255 60.422 75.4762 60.1193C74.8792 59.7926 63.775 67.0117 47.6163 78.2307C32.8426 88.4936 21.0828 96.3103 20.3186 96.5653C19.4828 96.8441 18.9336 96.629 18.9416 96.0314C18.9575 95.4816 30.1681 87.402 45.0452 77.0993C59.9144 66.7965 72.0932 58.199 72.1171 57.9758C72.133 57.7527 60.1373 48.701 45.4592 37.8564C30.773 27.0118 19.3029 18.6931 19.3029 18.3266Z"
              fill="#DEB1F0"
            />
            <path
              d="M134.727 3.98485C136.447 2.90119 139.105 1.57849 140.641 1.03666C142.178 0.486861 144.677 0.0247116 146.213 0.000807283C147.75 -0.023097 150.79 0.486861 152.979 1.13228C155.168 1.76972 158.392 3.4988 160.143 4.97289C161.895 6.44699 164.131 9.24379 165.11 11.188C166.376 13.7059 166.893 16.1442 166.901 19.6979C166.901 22.4389 166.352 26.0246 165.676 27.666C164.999 29.3074 163.12 32.0325 161.497 33.7058C159.881 35.3871 157.119 37.4986 155.367 38.399C153.616 39.2915 150.209 40.2078 147.805 40.4309C144.773 40.7098 142.082 40.391 139.049 39.3791C136.224 38.4468 133.525 36.7815 131.448 34.6939C129.529 32.7736 127.659 29.8254 126.855 27.4668C126.107 25.2756 125.494 22.2238 125.494 20.6939C125.486 19.1641 126.051 16.2876 126.735 14.3195C127.428 12.3513 128.805 9.65813 129.8 8.3434C130.787 7.02866 133.008 5.06851 134.727 3.98485Z"
              fill="#02AFA9"
            />
            <path
              d="M145.584 24.5425C146.149 23.8095 149.111 20.3115 152.159 16.7737C155.216 13.2358 158.081 10.3195 158.527 10.3036C158.981 10.2797 159.793 10.8215 160.342 11.4988C161.138 12.4789 161.138 12.9968 160.342 14.0725C159.793 14.8135 156.362 18.8454 152.708 23.0366C149.063 27.2278 145.568 30.925 144.948 31.2517C144.175 31.666 142.4 30.3353 139.248 26.9887C136.733 24.3115 134.225 21.443 133.676 20.6143C132.88 19.4031 132.88 18.8533 133.676 17.8733C134.225 17.196 134.942 16.6541 135.268 16.678C135.595 16.694 137.823 18.7736 140.211 21.2916C144.112 25.4031 144.661 25.7378 145.584 24.5425Z"
              fill="white"
            />
          </svg>
        )}
        <div style={fail ? { fontSize: "1.4rem" } : undefined}>
          {" "}
          {fail
            ? "Your message couldn't be sent. Please try again."
            : "Your message has been sent!"}
        </div>
      </div>
    ),
    message: fail ? null : "I'll get back to you soon.",
  };
};

const Contact = () => {
  const { showDialog } = useDialog();
  const { isAr } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const t = useTranslations("contact");
  const ref = useRef(null);
  const phoneRef = useRef(null);
  const leftPanelRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
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
        x: isAr ? 15 : -15,
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
  }, [isAr]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const isNameVal = isNameValid(data.name);
    const isEmailVal = isEmailValid(data.email);
    const isMessageVal = isMessageValid(data.message);

    const willAbort = !isNameVal || !isEmailVal || !isMessageVal;

    if (!isNameVal) {
      setNameError(t("nameError"));
    }
    if (!isEmailVal) {
      if (!data.email.trim()) {
        setEmailError(t("required"));
      } else {
        setEmailError(t("invalidEmail"));
      }
    }

    if (!isMessageVal) {
      setMessageError(t("messageError"));
    }

    if (willAbort) {
      return;
    }

    setIsLoading(true);
    const { success } = await sendEmailAction(data);

    if (success) {
      formRef.current?.reset();
    }

    showDialog(resultDialogContent(!success));

    setIsLoading(false);
  };

  const getFieldLabel = (label: string, error: string | null) => {
    return (
      <label style={error ? { color: "var(--error-color)" } : undefined}>
        {label}
        {error?.trim() && (
          <>
            {" "}
            -
            <span style={{ fontStyle: "italic", fontSize: "14px" }}>
              {" "}
              {error}
            </span>
          </>
        )}
      </label>
    );
  };

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
              initial={{ scale: 0.85, opacity: 0.9 }}
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
                  !isAr
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
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.55, 0, 0.15, 1],
            }}
            style={{ display: "flex", gap: "2rem", marginTop: "1.5rem" }}
          >
            <OutlinedButton
              href="https://instagram.com/waseemalamadd"
              target="_blank"
            >
              <div
                style={{
                  display: "flex",
                  gap: ".3rem",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  flexShrink: "0",
                  whiteSpace: "nowrap",
                }}
              >
                <Instagram size={30} /> <span>Instagram</span>
              </div>
            </OutlinedButton>
            <OutlinedButton
              href="https://www.linkedin.com/in/waseemalamad/"
              target="_blank"
            >
              <div
                style={{
                  display: "flex",
                  gap: ".3rem",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  flexShrink: "0",
                  whiteSpace: "nowrap",
                }}
              >
                <LinkedIn size={30} /> <span>Linkedin</span>
              </div>
            </OutlinedButton>
            <OutlinedButton
              href="https://github.com/WaseeM-Alamad"
              target="_blank"
            >
              <div
                style={{
                  display: "flex",
                  gap: ".3rem",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  flexShrink: "0",
                  whiteSpace: "nowrap",
                }}
              >
                <Github size={31} /> <span>Github</span>
              </div>
            </OutlinedButton>
            {/* <RoundButton> <ArrowBigDown/> </RoundButton> */}
            {/* <RoundButton /> */}
            {/* <RoundButton /> */}
          </motion.div>
        </div>
        <div className="bg-img">
          <form ref={formRef} onSubmit={handleSubmit}>
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
                  {getFieldLabel(t("name"), nameError)}
                  <input
                    onChange={() => setNameError(null)}
                    name="name"
                    dir="auto"
                    type="text"
                    autoCorrect="false"
                    placeholder={t("namePlaceholder")}
                    maxLength={100}
                    disabled={isLoading}
                  />
                </div>
                <div className="input-wrapper">
                  {getFieldLabel(t("email"), emailError)}
                  <input
                    onChange={() => setEmailError(null)}
                    name="email"
                    dir="auto"
                    type="text"
                    autoCorrect="false"
                    placeholder="e.g. john@example.com"
                    maxLength={254}
                    disabled={isLoading}
                  />
                </div>
                <div className="input-wrapper">
                  {getFieldLabel(t("message"), messageError)}
                  <textarea
                    onChange={() => setMessageError(null)}
                    name="message"
                    dir="auto"
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    autoCorrect="false"
                    maxLength={2000}
                    disabled={isLoading}
                  />
                </div>
                <ArrowButton
                  type="submit"
                  disabled={isLoading}
                  title={t("sendMessage")}
                  loadingText={t("sending")}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>
          </form>
        </div>
      </div>
      <div className="table-phone" ref={phoneRef}>
        <TablePhone />
      </div>
    </motion.section>
  );
};

export default Contact;
