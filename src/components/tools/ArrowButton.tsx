import { ArrowRight } from "lucide-react";
import "@/styles/arrowButton.css";

const ArrowButton = ({
  title,
  bgColor,
  secondaryColor,
  textColor,
}: {
  title?: string;
  bgColor?: string;
  secondaryColor?: string;
  textColor?: string;
}) => {
  const btnColor = { backgroundColor: bgColor };
  const circleColor = { backgroundColor: secondaryColor };
  const titleColor = { color: textColor };

  return (
    <button className="form-btn" style={{ marginTop: "1rem", ...btnColor }}>
      <span
        className="form-btn-text"
        style={{ opacity: 0, position: "relative" }}
      >
        {title}
      </span>
      <span className="form-btn-text" style={titleColor ?? undefined}>
        {title}
      </span>
      <div className="btn-circle" style={circleColor ?? undefined}>
        <ArrowRight className="arrow-icon" size={18} />
      </div>
      <div className="btn-circle-hover" style={circleColor ?? undefined}>
        <ArrowRight className="arrow-icon" size={18} />
      </div>
    </button>
  );
};

export default ArrowButton;
