import { ArrowRight } from "lucide-react";
import "@/styles/arrowButton.css";
import { ButtonHTMLAttributes } from "react";

type ArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  bgColor?: string;
  secondaryColor?: string;
  textColor?: string;
  isLoading?: boolean;
  loadingText?: string;
};

const ArrowButton = ({
  title,
  bgColor,
  secondaryColor,
  textColor,
  isLoading = false,
  loadingText = "",
  ...props
}: ArrowButtonProps) => {
  const btnColor = { backgroundColor: bgColor };
  const circleColor = { backgroundColor: secondaryColor };
  const titleColor = { color: textColor };

  return (
    <button
      className="form-btn"
      style={{
        marginTop: "1rem",
        pointerEvents: isLoading ? "none" : "auto",
        ...btnColor,
      }}
      {...props}
    >
      <span
        className="form-btn-text"
        style={{ opacity: 0, position: "relative" }}
      >
        <span style={{ opacity: isLoading ? "0" : "1" }}>{title}</span>
        <span
          style={{
            position: "absolute",
            insetInlineStart: "0",
            opacity: isLoading ? "1" : "0",
            transition: "opacity 0.2s ease",
          }}
        >
          {loadingText}
        </span>
      </span>
      <span className="form-btn-text" style={titleColor ?? undefined}>
        <span style={{ opacity: isLoading ? "0" : "1" }}>{title}</span>
        <span
          style={{
            position: "absolute",
            insetInlineStart: "0",
            opacity: isLoading ? "1" : "0",
            transition: "opacity 0.2s ease",
          }}
        >
          {loadingText}
        </span>
      </span>
      <div className="btn-circle" style={circleColor ?? undefined}>
        <ArrowRight className="arrow-icon" size={18} />
        <div
          className="arrow-btn-loader"
          style={{ opacity: isLoading ? "1" : "0" }}
        />
      </div>
      <div className="btn-circle-hover" style={circleColor ?? undefined}>
        <ArrowRight className="arrow-icon" size={18} />
        <div
          className="arrow-btn-loader"
          style={{ opacity: isLoading ? "1" : "0" }}
        />
      </div>
    </button>
  );
};

export default ArrowButton;
