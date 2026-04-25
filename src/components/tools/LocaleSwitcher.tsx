"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

export default function LocaleSwitcher({
  inSidebar = true,
}: {
  inSidebar?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === "en" ? "ar" : "en" });
    router.refresh();
  };

  return (
    <div className={inSidebar ? undefined : "top-util"}>
      <div
        className={`${inSidebar ? "side-toggle" : "top-toggle"} border-radius-btn`}
        onClick={() => {
          switchLocale();
        }}
      >
        {inSidebar && <Globe size={15} />}
        <div>{locale === "en" ? "AR" : "EN"}</div>
      </div>
    </div>
  );
}
