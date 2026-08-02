"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { easeOut } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import { navigation } from "../home.content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        className={`pointer-events-none fixed top-0 left-0 z-[100] w-full px-5 pb-4 text-white transition-[padding] duration-[550ms] sm:px-8 lg:px-12 ${easeOut} ${
          scrolled ? "pt-2.5" : "pt-4 lg:pt-[22px]"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between border transition-[width,height,padding,border-color,background-color,box-shadow,color] duration-[550ms] ${easeOut} ${
            scrolled
              ? "h-[50px] w-full max-w-[920px] rounded-full border-white/60 bg-white/[0.88] pr-2 pl-[18px] text-ink shadow-[0_16px_48px_rgba(17,17,15,0.14)] backdrop-blur-2xl"
              : "h-[52px] w-full max-w-[1440px] border-transparent px-0.5 lg:h-[58px]"
          }`}
        >
          <Link
            href="#top"
            className="inline-flex min-h-11 w-[84px] items-center"
            aria-label={`${brand.name} 홈`}
          >
            <Image
              className={`h-auto w-[84px] transition-[filter] duration-300 ${
                scrolled ? "filter-none" : "brightness-0 invert"
              }`}
              src={brand.assets.logoWord}
              alt=""
              width={446}
              height={233}
              priority
              sizes="84px"
            />
          </Link>

          <nav className="mr-[42px] ml-auto hidden items-center gap-[34px] lg:flex" aria-label="주요 메뉴">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-3.5 text-[12px] font-bold after:absolute after:right-0 after:bottom-2.5 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              className={`inline-flex min-h-10 items-center justify-center rounded-full px-[15px] text-[12px] font-bold transition-[transform,background-color] duration-200 lg:min-h-11 lg:px-5 ${easeOut} ${
                scrolled
                  ? "bg-ink text-white hover:-translate-y-0.5"
                  : "bg-lime text-ink hover:-translate-y-0.5 hover:bg-white"
              }`}
              href="#contact"
            >
              프로젝트 문의
            </Link>
            <button
              className="grid size-11 cursor-pointer place-items-center bg-transparent p-[11px] text-current lg:hidden [&_svg]:size-[22px]"
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
        className={`fixed inset-0 z-[90] transition-[visibility] ${
          menuOpen
            ? "visible pointer-events-auto delay-0"
            : "invisible pointer-events-none delay-[450ms]"
        }`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <button
          className={`absolute inset-0 size-full cursor-default bg-ink/55 transition-opacity duration-[350ms] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 flex h-full w-[min(88vw,390px)] flex-col bg-ink px-6 pt-28 pb-7 text-white transition-transform duration-[450ms] ${easeOut} ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="모바일 메뉴"
        >
          <p className="mb-8 text-[12px] font-bold leading-[1.2] text-white/50">NAVIGATION</p>
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[68px] items-center gap-[18px] border-b border-white/20 text-[28px] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-[11px] text-lime">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            className="mt-auto grid min-h-[52px] place-items-center rounded-full bg-lime font-bold text-ink"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            프로젝트 문의
          </Link>
        </nav>
      </div>
    </>
  );
}
