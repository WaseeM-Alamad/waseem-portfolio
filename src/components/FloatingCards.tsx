/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@/styles/floatingCards.css";
import { useGlobalContext } from "@/contexts/GlobalContext";

const FloatingCards = () => {
  const { isSplashPlaying } = useGlobalContext();

  if (isSplashPlaying) return;
  
  return (
    <div className="floating-imgs-container">
      <div className="floating-imgs-layer">
        {[0, 1].map((i) => (
          <div key={i} className="floating-imgs-layer-inner">
            <img
              alt=""
              style={{
                width: "18%",
                bottom: "0%",
                left: "8%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/201"
            />
            <img
              alt=""
              style={{
                width: "14%",
                bottom: "55%",
                left: "3%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/202"
            />
            <img
              alt=""
              style={{
                width: "20%",
                bottom: "50%",
                left: "38%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/203"
            />
            <img
              alt=""
              style={{
                width: "16%",
                bottom: "75%",
                left: "25%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/204"
            />
            <img
              alt=""
              style={{
                width: "13%",
                bottom: "30%",
                right: "5%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/205"
            />
            <img
              alt=""
              style={{
                width: "17%",
                bottom: "65%",
                right: "20%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/206"
            />
            <img
              alt=""
              style={{
                width: "15%",
                bottom: "10%",
                left: "32%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/207"
            />
            <img
              alt=""
              style={{
                width: "12%",
                bottom: "85%",
                right: "8%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/208"
            />
            <img
              alt=""
              style={{
                width: "19%",
                bottom: "20%",
                right: "35%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/209"
            />
            <img
              alt=""
              style={{
                width: "11%",
                bottom: "40%",
                left: "22%",
                position: "absolute",
              }}
              src="https://picsum.photos/300/210"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingCards;
