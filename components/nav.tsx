"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Lockup } from "@/components/mark";
import { Tx } from "@/components/tx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GROUPS, PHONE_DISPLAY, PHONE_TEL, type NavGroup } from "@/lib/nav";

function setLang(lang: "en" | "pt") {
  document.documentElement.lang = lang;
  localStorage.setItem("cps-lang", lang);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("cps-theme", next);
}

export function Nav() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [frost, setFrost] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menu]);

  useEffect(() => {
    const onScroll = () => {
      const frame = document.querySelector("[data-hero-frame]");
      if (!frame) {
        setFrost(false);
        return;
      }
      const r = frame.getBoundingClientRect();
      setFrost(r.top < 8 && r.bottom > 64);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenu(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header ref={ref} className="sticky top-0 z-50" data-nav>
      <a href="#content" className="skip-link">
        <Tx text="Skip to content" />
      </a>
      <div className="nav-bar" data-frost={frost ? "true" : "false"}>
        <div className="flex items-center gap-2 px-4 py-3 lg:gap-3 lg:px-5 xl:gap-4 xl:px-8">
          <Link href="/" aria-label="Cary Plastic Surgery" className="shrink-0">
            <span className="lg:hidden">
              <Lockup compact />
            </span>
            <span className="hidden lg:inline-flex">
              <Lockup />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-center lg:flex lg:gap-0.5 xl:gap-1">
            {GROUPS.map((group) => (
              <Drop
                key={group.label}
                group={group}
                open={open === group.label}
                onOpen={() => setOpen(group.label)}
                onClose={() => setOpen((v) => (v === group.label ? null : v))}
                align={group.label === "Cosmetic" || group.label === "Face" ? "right" : "left"}
              />
            ))}
            <Link href="/before-after-gallery" className="whitespace-nowrap px-2 py-2 text-[13px] xl:px-2.5 xl:text-sm">
              <Tx text="Gallery" />
            </Link>
            <Link href="/contact-us" className="whitespace-nowrap px-2 py-2 text-[13px] xl:px-2.5 xl:text-sm">
              <Tx text="Contact" />
            </Link>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0 xl:gap-2">
            <a
              href={PHONE_TEL}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-line lg:inline-flex xl:hidden"
              aria-label="Call 919-233-1933"
            >
              <PhoneIcon />
            </a>
            <a href={PHONE_TEL} className="hidden whitespace-nowrap px-1 text-sm xl:inline">
              {PHONE_DISPLAY}
            </a>
            <span className="hidden lg:inline-flex">
              <LangToggle />
            </span>
            <button type="button" onClick={toggleTheme} className="hidden h-9 w-9 place-items-center lg:grid" aria-label="Theme">
              <span className="lang-en say-dark sr-only">Switch to dark</span>
              <span className="lang-en say-light sr-only">Switch to light</span>
              <span className="lang-pt say-dark sr-only">Mudar para o tema escuro</span>
              <span className="lang-pt say-light sr-only">Mudar para o tema claro</span>
              <SunIcon />
              <MoonIcon />
            </button>
            <Link
              href="/request-appointment"
              className="inline-flex items-center rounded-full bg-ink px-3 py-2 text-[12px] text-paper xl:px-4 xl:text-sm"
            >
              <Tx text="Book Now" />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center lg:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              data-menu-button
              onClick={() => setMenu((v) => !v)}
            >
              <span className="sr-only lang-en">{menu ? "Close menu" : "Open menu"}</span>
              <span className="sr-only lang-pt">{menu ? "Fechar menu" : "Abrir menu"}</span>
              {menu ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {menu ? <MobileSheet onNavigate={() => setMenu(false)} /> : null}
    </header>
  );
}

function Drop({
  group,
  open,
  onOpen,
  onClose,
  align,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  align: "left" | "right";
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[13px] xl:px-2.5 xl:text-sm"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
      >
        <Tx text={group.label} />
        <span aria-hidden className="text-[10px] text-muted">
          ▾
        </span>
      </button>
      {open ? (
        <div className={`absolute top-full z-40 pt-2 ${align === "right" ? "right-0" : "left-0"}`}>
          <div className="min-w-[260px] border border-line bg-paper p-5" data-dropdown>
            <Link href={group.href} className="mb-3 block text-sm font-medium" onClick={onClose}>
              <Tx text={group.hubLabel} />
            </Link>
            <ul className="space-y-1">
              {group.children
                .filter((c) => c.href !== group.href)
                .map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="block py-1.5 text-sm text-muted hover:text-ink" onClick={onClose}>
                      <Tx text={child.label} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileSheet({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="menu-sheet max-h-[calc(100svh-var(--nav-h))] overflow-auto border-b border-line lg:hidden" data-menu-sheet>
      <div className="shell py-4">
        <Accordion type="single" collapsible>
          {GROUPS.map((group) => (
            <AccordionItem key={group.label} value={group.label}>
              <AccordionTrigger>
                <Tx text={group.label} />
              </AccordionTrigger>
              <AccordionContent>
                <Link href={group.href} className="block py-2 text-sm font-medium" onClick={onNavigate}>
                  <Tx text={group.hubLabel} />
                </Link>
                {group.children
                  .filter((c) => c.href !== group.href)
                  .map((child) => (
                    <Link key={child.href} href={child.href} className="block py-2 text-sm text-muted" onClick={onNavigate}>
                      <Tx text={child.label} />
                    </Link>
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
          <Link href="/before-after-gallery" onClick={onNavigate} className="py-1">
            <Tx text="Gallery" />
          </Link>
          <Link href="/contact-us" onClick={onNavigate} className="py-1">
            <Tx text="Contact" />
          </Link>
          <a href={PHONE_TEL} className="py-1">
            {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-4 pt-2">
            <LangToggle />
            <button type="button" onClick={toggleTheme} className="grid h-9 w-9 place-items-center" aria-label="Theme">
              <span className="lang-en say-dark sr-only">Switch to dark</span>
              <span className="lang-en say-light sr-only">Switch to light</span>
              <span className="lang-pt say-dark sr-only">Mudar para o tema escuro</span>
              <span className="lang-pt say-light sr-only">Mudar para o tema claro</span>
              <SunIcon />
              <MoonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LangToggle() {
  return (
    <span className="inline-flex items-center text-[12px] tracking-[0.14em] xl:text-[13px]">
      <button type="button" data-set-lang="en" className="lang-choice px-1" onClick={() => setLang("en")}>
        EN
      </button>
      <span className="text-muted" aria-hidden>
        |
      </span>
      <button type="button" data-set-lang="pt" className="lang-choice px-1" onClick={() => setLang("pt")}>
        PT
      </button>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3.5h3.2l1.2 3-2 1.2a12 12 0 0 0 5.9 5.9l1.2-2 3 1.2V17a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 6.7 2 2 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" data-icon="sun">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" fill="none" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" data-icon="moon">
      <path d="M16 3.2A8.2 8.2 0 1 0 20.8 14 6.4 6.4 0 0 1 16 3.2Z" stroke="currentColor" fill="none" />
    </svg>
  );
}
