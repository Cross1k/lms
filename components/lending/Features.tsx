import { useTranslations } from "next-intl";

type FeatureItem = {
  title: string;
  about: string;
};

export function Features() {
  const t = useTranslations("Home");
  const features = t.raw("features") as FeatureItem[];

  return (
    <div className="grid gap-6 md:grid-cols-3 px-30">
      {features.map((feature, index) => (
        <div
          key={`${feature.title}-${index}`}
          className="space-y-2  xl:w-96 bg-card p-6 rounded-lg border"
        >
          <h3 className="text-2xl">{feature.title}</h3>
          <p className="text-base">{feature.about}</p>
        </div>
      ))}
    </div>
  );
}
