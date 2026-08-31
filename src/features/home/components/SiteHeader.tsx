"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

import { easeOut } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import { navigation } from "../home.content";

type SiteHeaderProps = {
  initialTone?: "dark" | "light";
};

export function SiteHeader({ initialTone = "dark" }: SiteHeaderProps = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const usesLightTone = scrolled || (initialTone === "light" && !menuOpen);

  // 이미 목적지 페이지에 있으면 라우팅 대신 맨 위로 스무스 스크롤한다.
  const scrollToTopIfCurrent = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== href) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`pointer-events-none fixed top-0 left-0 z-100 w-full animate-header-enter px-5 pb-4 transition-[padding,color] duration-550 motion-reduce:animate-none sm:px-8 lg:px-12 ${easeOut} ${
          usesLightTone ? "text-navy-ink" : "text-white"
        } ${scrolled ? "pt-2.5" : "pt-4 lg:pt-5.5"}`}
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between border transition-[width,height,padding,border-color,background-color,box-shadow,color] duration-550 ${easeOut} ${
            scrolled
              ? "h-12 w-full max-w-225 rounded-full border-white/70 bg-white/92 pr-1.5 pl-4.5 text-navy-ink shadow-[0_16px_48px_rgba(7,39,108,0.16)] backdrop-blur-2xl"
              : "h-13 w-full max-w-291 border-transparent px-0.5 lg:h-14.5"
          }`}
        >
          <Link
            href="/"
            onClick={scrollToTopIfCurrent("/")}
            className="inline-flex min-h-11 w-21 items-center"
            aria-label={`${brand.name} 홈`}
          >
            <Image
              className={`h-auto w-21 transition-[filter] duration-300 ${
                usesLightTone ? "filter-none" : "brightness-0 invert"
              }`}
              src={brand.assets.logoWord}
              alt=""
              width={446}
              height={233}
              priority
              sizes="84px"
            />
          </Link>

          <nav
            className="mr-10.5 ml-auto hidden items-center gap-8.5 lg:flex"
            aria-label="주요 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={scrollToTopIfCurrent(item.href)}
                className="relative py-3.5 text-[12px] font-bold after:absolute after:right-0 after:bottom-2.5 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              className={`inline-flex min-h-10 items-center justify-center rounded-full px-3.75 text-[12px] font-bold transition-[transform,background-color] duration-200 lg:min-h-11 lg:px-5 ${easeOut} ${
                usesLightTone
                  ? "bg-navy-primary text-white hover:-translate-y-0.5 hover:bg-navy-deep"
                  : "bg-white text-navy-deep hover:-translate-y-0.5 hover:bg-navy-tint"
              }`}
              href="#contact"
              data-analytics-event="contact_start"
              data-entry-point="header"
            >
              프로젝트 문의
            </Link>
            <button
              className="grid size-11 cursor-pointer place-items-center bg-transparent p-2.75 text-current lg:hidden [&_svg]:size-5.5"
              type="button"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <XMarkIcon aria-hidden="true" /> : <Bars3Icon aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-90 transition-[visibility] ${
          menuOpen
            ? "pointer-events-auto visible delay-0"
            : "pointer-events-none invisible delay-450"
        }`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <button
          className={`absolute inset-0 size-full cursor-default bg-navy-night/65 transition-opacity duration-350 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 flex h-full w-[min(88vw,360px)] flex-col bg-navy-night px-6 pt-28 pb-7 text-white transition-transform duration-450 ${easeOut} ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="모바일 메뉴"
        >
          <p className="mb-4 text-[12px] leading-[1.2] font-bold text-white/50">NAVIGATION</p>
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-14 items-center gap-4.5 border-b border-white/20 text-[24px] font-bold sm:min-h-17 sm:text-[28px]"
              onClick={(event) => {
                scrollToTopIfCurrent(item.href)(event);
                setMenuOpen(false);
              }}
            >
              <span className="text-[11px] text-navy-signal">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            className="mt-auto grid min-h-13 place-items-center rounded-full bg-white font-bold text-navy-deep"
            href="#contact"
            data-analytics-event="contact_start"
            data-entry-point="mobile_header"
            onClick={() => setMenuOpen(false)}
          >
            프로젝트 문의
          </Link>
        </nav>
      </div>
    </>
  );
}
