import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation - Work with Erica J. Boothby, Ph.D. ",
  description:
    "Work directly with Dr. Erica J. Boothby to apply her research-backed insights on social connection, negotiation, and inclusion. Erica offers personalized consulting and workshops tailored to the needs of organizations, teams, and individuals.",
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
