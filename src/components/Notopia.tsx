import Link from "next/link";
import React from "react";

const Notopia = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        width: "100%",
        height: "100dvh",
        paddingLeft: "var(--sidebar-width)",
        boxSizing: "border-box",
      }}
    >
      {" "}
      <div style={{ padding: "5rem" }}>
        <button onClick={() => window.history.pushState(null, "", "/")}>
          Home
        </button>
        <div style={{ fontSize: "4rem" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          quos id eaque ducimus quasi in culpa, expedita quia saepe, quaerat
          quidem ab nam a corrupti unde aut esse vel suscipit!
        </div>
      </div>
    </div>
  );
};

export default Notopia;
