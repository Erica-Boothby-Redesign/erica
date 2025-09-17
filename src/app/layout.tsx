import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import WrapperEmailCaptureModal from "./components/general-component/WrapperEmailController";

export const metadata: Metadata = {
  title: "Erica J. Boothby - Psychologist, Researcher, and Educator",
  description:
    "Erica J. Boothby, Ph.D., is a psychologist specializing in social connection and the barriers that inhibit it. Through her research, teaching, and workshops, she helps individuals and organizations foster inclusion, collaboration, and belonging. Explore her insights on relationships, workplace diversity, and prosocial behavior.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* bing tracking  */}
      <Script
        id="Bing clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", '${process.env.NEXT_PUBLIC_BING_CLARITY_ID}');`,
        }}
      />

      <body className={``} style={{ backgroundColor: "#DFE4DF" }}>
        <WrapperEmailCaptureModal />
        {children}
      </body>
    </html>
  );
}
