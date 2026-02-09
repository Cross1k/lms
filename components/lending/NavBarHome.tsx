import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";

export function NavBarHome() {
  const t = useTranslations("Home.header");

  return (
    <>
      <div className="inline-flex items-center justify-between 2xl:w-227.5 h-17.5 mt-12.5 mr-12.5 bg-card px-6 py-5 rounded-lg border text-xl ">
        <Link href="/">
          <SparkleIcon className="inline-block mr-2.5" />
          Lumi
        </Link>

        <ul className="inline-flex  lg:gap-12.5 *:hover:underline  underline-offset-4">
          <li>
            <Link href={"/products"}>{t("products")}</Link>
          </li>
          <li>
            <Link href={"/pricing"}>{t("pricing")}</Link>
          </li>
          <li>
            <Link href={"/about"}>{t("about")}</Link>
          </li>
        </ul>
      </div>
      <Button variant="outline" className="text-xl w-60 px-6 py-5 h-17.5">
        {t("core")}
      </Button>
    </>
  );
}
