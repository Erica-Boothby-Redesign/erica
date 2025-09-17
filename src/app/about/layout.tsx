import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erica About ",
  description: "Erica About description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={``} style={{ backgroundColor: "#DFE4DF" }}>
      {children}
    </main>
  );
}
