import { projects, sections } from "@/utils/sectionsData";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function useDetectSection({
  setCurrentSection,
}: {
  setCurrentSection: Dispatch<SetStateAction<string>>;
}) {
  const activeSectionRef = useRef<string | null>(null);

  useEffect(() => {
    const sectionsArray = [...sections, ...projects];
    const onSectionView = (id: string) => {
      setCurrentSection(id);
      if (!["notopia", "caterfy", "contact"].includes(id)) {
        document.documentElement.setAttribute("data-section", "default");
        return;
      }
      document.documentElement.setAttribute("data-section", id);
    };
    const handleScroll = () => {
      let maxVisibility = 0;
      let mostVisibleSection = "";

      sectionsArray.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight * 1.4;

        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, windowHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / rect.height;

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = id;
        }
      });

      if (
        mostVisibleSection &&
        mostVisibleSection !== activeSectionRef.current
      ) {
        activeSectionRef.current = mostVisibleSection;
        onSectionView(mostVisibleSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef, setCurrentSection]);
}
