"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// Lightweight scroll-reveal. Replaces framer-motion's `whileInView` fade-ups
// with an IntersectionObserver + CSS transition (~1KB vs ~116KB of framer).
// Same visual behavior: fades/translates in once when scrolled into view, and
// is disabled for `prefers-reduced-motion` users (handled in CSS).
type RevealProps = {
  /** Element to render as (keeps semantic tags like <article>). */
  as?: ElementType;
  className?: string;
  /** "up" = fade + slide up (default), "fade" = opacity only. */
  variant?: "up" | "fade";
  /** Stagger delay in seconds. */
  delay?: number;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
};

export function Reveal({
  as: Tag = "div",
  className = "",
  variant = "up",
  delay = 0,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IO support → just show it (progressive enhancement).
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [
    "reveal",
    `reveal--${variant}`,
    visible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cls}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
