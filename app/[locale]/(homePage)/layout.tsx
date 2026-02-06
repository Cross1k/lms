import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ThemeToggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-4 right-4 flex gap-2">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
      {children}
    </>
  );
}
