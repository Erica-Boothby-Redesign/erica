import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications - Erica J. Boothby, Ph.D.",
  description:
    "Explore Erica J. Boothby's groundbreaking research on social connection, published in top academic journals and featured in prominent media outlets.",
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
