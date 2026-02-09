import { Features } from "@/components/lending/Features";
import { NavBarHome } from "@/components/lending/NavBarHome";
import { useTranslations } from "next-intl";

export default function homePage() {
  const t = useTranslations("Home");

  return (
    <main className="flex flex-col items-center min-w-80 max-w-360 self-center">
      <nav className="px-30">
        <NavBarHome />
      </nav>
      <div className="max-w-171 my-59 align-center text-center">
        <h1 className="text-4xl md:text-8xl mb-6 ">{t("hero.title")}</h1>
        <p className="text-xs md:text-lg">{t("hero.text")}</p>
      </div>
      <Features />
    </main>
  );
}
