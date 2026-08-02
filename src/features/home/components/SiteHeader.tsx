"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header__inner">
          <Link href="#top" className="wordmark" aria-label={`${brand.name} 홈`}>
            <Image
              className="wordmark__image"
              src={brand.assets.logoWord}
              alt=""
              width={446}
              height={233}
              priority
              sizes="84px"
            />
          </Link>

          <nav className="site-nav" aria-label="주요 메뉴">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link className="header-cta" href="#contact">
              프로젝트 문의
            </Link>
            <button
              className="menu-button"
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
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <button
          className="mobile-menu__backdrop"
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="mobile-menu__panel" aria-label="모바일 메뉴">
          <p className="eyebrow">NAVIGATION</p>
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link className="mobile-menu__contact" href="#contact" onClick={() => setMenuOpen(false)}>
            프로젝트 문의
          </Link>
        </nav>
      </div>
    </>
  );
}
