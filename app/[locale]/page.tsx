import { getTranslations } from "next-intl/server";

type FeatureItem = { title: string; text: string };
type StepItem = { number: string; title: string; text: string };

export default async function HomePage() {
  const t = await getTranslations("Home");

  const features = t.raw("features.items") as FeatureItem[];
  const steps = t.raw("howItWorks.steps") as StepItem[];

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h1 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">
            {t("hero.title")}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <a
              href="/"
              className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
            >
              {t("hero.ctaPrimary")}
            </a>

            <a href="/" className="rounded-lg border px-6 py-3">
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-10">
          <h2 className="text-center text-3xl">{t("features.title")}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <Feature key={f.title} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-12">
          <h2 className="text-center text-3xl">{t("howItWorks.title")}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <Step
                key={s.number}
                number={s.number}
                title={s.title}
                text={s.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
          <h2 className="text-3xl">{t("finalCta.title")}</h2>

          <p className="text-muted-foreground">{t("finalCta.subtitle")}</p>

          <a
            href="/"
            className="inline-flex rounded-lg bg-primary px-8 py-4 text-primary-foreground"
          >
            {t("finalCta.button")}
          </a>
        </div>
      </section>
    </main>
  );
}

/* ===== Components ===== */

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-3">
      <h3 className="text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">{number}</div>
      <h3 className="text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
