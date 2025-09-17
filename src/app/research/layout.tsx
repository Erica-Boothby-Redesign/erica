import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Research - Erica J. Boothby, Ph.D. ",
  description:
    "Explore the data-driven research of Erica J. Boothby, Ph.D., focusing on the power of metaperceptions—our beliefs about how others see us—and their impact on workplace belonging, psychological safety, and overall well-being. Delve into her studies to uncover how these perceptions shape social connections, influence job satisfaction, and affect performance in the workplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={``} style={{ backgroundColor: "#DFE4DF" }}>
      {/* bing tracking  */}
      {/* <Script
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
      /> */}
      {children}
    </main>
  );
}
