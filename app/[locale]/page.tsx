import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("some")}</p>
      <p>{t("some2")}</p>
      <Button>{t("button")}</Button>
    </>
  );
}
