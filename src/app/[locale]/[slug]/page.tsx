import Main from "@/components/Main";
import TransitionWrapper from "@/components/TransitionWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  const acceptedRoutes = ["notopia"];

  if (!acceptedRoutes.includes(slug)) return <div>404</div>;

  return <TransitionWrapper />;
}
