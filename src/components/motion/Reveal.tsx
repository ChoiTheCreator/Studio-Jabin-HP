"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { easeOut } from "@/components/ui/tailwind";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const Component = as;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      className={`transition-[opacity,transform] duration-[800ms] ${easeOut} motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-9 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
