import type { Metadata } from "next";
import { Montserrat, Newsreader } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Opening } from "@/components/opening";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mont",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  variable: "--font-news",
  display: "swap",
});

const boot = `(function(){try{var t=localStorage.getItem('cps-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';var l=localStorage.getItem('cps-lang');if(l==='pt')document.documentElement.lang='pt';var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var hash=location.hash&&location.hash.length>1;var seen=false;try{seen=!!sessionStorage.getItem('cps-open-seen')}catch(e){}var path=location.pathname;if(!seen&&!hash&&!reduce&&(path==='/'||path==='')){document.documentElement.dataset.open='pending';var d=document.createElement('div');d.id='cps-boot';d.setAttribute('aria-hidden','true');d.style.cssText='position:fixed;inset:0;z-index:90;background:'+(t==='dark'?'#0F1C2B':'#F3EEE6')+';';document.addEventListener('DOMContentLoaded',function(){if(document.body)document.body.appendChild(d);});}}catch(e){document.documentElement.dataset.theme='light';}})();`;

export const metadata: Metadata = {
  title: "Top Plastic Surgery in Cary, NC - Dr. Hanna",
  description:
    "Cary Plastic Surgery: Award-winning care with Dr. Hanna. Breast, body, face, and cosmetic enhancements. Book now!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <Opening />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
