import Link from "next/link";
import Image from "next/image";
import { Mark } from "@/components/mark";
import { Tx } from "@/components/tx";
import { AFFILIATIONS, ADDRESS_LINES, GROUPS, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/nav";

const STUDY_EN =
  "built by dglxss · Independent design study — not affiliated with Cary Plastic Surgery or Dr. Donald P. Hanna.";
const STUDY_PT =
  "feito pela dglxss · Estudo de design independente — sem afiliação com a Cary Plastic Surgery nem com o Dr. Donald P. Hanna.";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell section-pad">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="min-w-0 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Cary Plastic Surgery">
              <Mark className="h-12 w-auto" />
              <span>
                <span className="block text-sm font-semibold tracking-[0.2em]">CARY</span>
                <span className="mt-1 block text-[9px] tracking-[0.24em] text-muted">PLASTIC SURGERY</span>
              </span>
            </Link>
            <div className="mt-8 text-sm">
              <p className="caps text-muted">
                <Tx text="Location & Hours" />
              </p>
              <p className="mt-3">Cary Plastic Surgery</p>
              {ADDRESS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="mt-3">
                <a className="prose-link" href={PHONE_TEL}>
                  {PHONE_DISPLAY}
                </a>
              </p>
              <dl className="mt-4 space-y-1">
                {HOURS.map((row) => (
                  <div key={row.day} className="grid grid-cols-[8.5rem_1fr] gap-2 text-sm">
                    <dt>
                      <Tx text={row.day} />
                    </dt>
                    <dd className="text-muted">
                      <Tx text={row.time} />
                    </dd>
                  </div>
                ))}
              </dl>
              <Link href="/request-appointment" className="mt-6 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper">
                <Tx text="Book Now" />
              </Link>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 lg:grid-cols-5">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <Link href={group.href} className="caps text-muted">
                  <Tx text={group.label} />
                </Link>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {group.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="hover:text-brand">
                        <Tx text={child.label} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap items-center gap-6">
          {AFFILIATIONS.map((item) => (
            <li key={item.name}>
              <Image src={item.src} alt={item.name} width={120} height={48} className="affil h-10 w-auto object-contain px-2" />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/accessibility">
            <Tx text="Accessibility" />
          </Link>
          <Link href="/privacy-policy">
            <Tx text="Privacy Policy" />
          </Link>
          <Link href="/terms-and-conditions">
            <Tx text="Terms & Conditions" />
          </Link>
          <Link href="/sitemap">
            <Tx text="Site Map" />
          </Link>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            <Tx text="View Interactive Map" />
          </a>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Tx text="© 2025 All rights reserved." />
        </p>
        <p className="mt-10 overflow-hidden font-semibold leading-[0.8] tracking-[-0.07em] text-[18vw] text-ink md:text-[14vw]">
          CARY
        </p>
        <p className="mt-4 max-w-xl text-xs text-muted">
          <span className="lang-en">{STUDY_EN}</span>
          <span className="lang-pt">{STUDY_PT}</span>
        </p>
      </div>
    </footer>
  );
}
