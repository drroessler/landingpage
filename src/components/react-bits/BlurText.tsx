import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  startDelay?: number;
}

export default function BlurText({
  text = "",
  delay = 0,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  startDelay = 0,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Fire completion callback after all elements have finished animating
  useEffect(() => {
    if (!inView || !onAnimationComplete) return;
    const totalMs = (startDelay + ((elements.length - 1) * delay) / 1000 + 0.5) * 1000;
    const timer = setTimeout(onAnimationComplete, totalMs);
    return () => clearTimeout(timer);
  }, [inView, onAnimationComplete, elements.length, delay, startDelay]);

  const directionClass = direction === "bottom" ? "reveal-word-bottom" : "";

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => (
        <span
          key={index}
          className={`inline-block reveal-word ${directionClass} ${inView ? "animate" : ""}`}
          style={{
            animationDelay: inView
              ? `${startDelay + (index * delay) / 1000}s`
              : undefined,
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </p>
  );
}
