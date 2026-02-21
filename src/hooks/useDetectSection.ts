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
      const viewportMiddle = window.innerHeight / 1.3;
      let currentSection = "";

      sectionsArray.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          currentSection = id;
        }
      });

      if (currentSection && currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        onSectionView(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef, setCurrentSection]);
}
