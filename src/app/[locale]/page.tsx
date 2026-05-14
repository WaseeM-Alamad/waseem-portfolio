import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Main from "@/components/Main";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <TransitionWrapper />;
}
