import { useState, useEffect, useCallback } from "react";

interface Phase {
  text: string;
  label: string;
}

interface MorphingHeadlineProps {
  phases: Phase[];
  className?: string;
}

const HOLD_MS = [3500, 4000, 5000];
const FADE_MS = 700;

export default function MorphingHeadline({ phases, className = "" }: MorphingHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const advance = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % phases.length);
      setVisible(true);
    }, FADE_MS);
  }, [phases.length]);

  useEffect(() => {
    const holdDuration = HOLD_MS[index] ?? HOLD_MS[HOLD_MS.length - 1];
    const timer = setTimeout(advance, holdDuration);
    return () => clearTimeout(timer);
  }, [index, advance]);

  return (
    <div className="flex flex-col items-center">
      {/* Morphing text — only opacity + translateY (GPU-composited) */}
      <span
        className={`${className} will-change-transform`}
        style={{
          display: "block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translate3d(0,0,0)" : "translate3d(0,8px,0)",
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
        }}
      >
        {phases[index].text}
      </span>

      {/* Progress indicator — all animations via transform/opacity only */}
      <div className="flex items-center justify-center mt-8 md:mt-10 gap-0">
        {phases.map((phase, i) => (
          <div key={i} className="flex items-center">
            {/* Connecting line: scaleX instead of width */}
            {i > 0 && (
              <div className="relative w-12 sm:w-20 h-0.5 mx-0.5 bg-border/60 overflow-hidden rounded-full">
                <div
                  className="absolute inset-0 bg-accent will-change-transform rounded-full"
                  style={{
                    transformOrigin: "left center",
                    transform: index >= i ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 800ms ease",
                  }}
                />
              </div>
            )}

            {/* Step dot: fixed size, scale + opacity for glow */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
                {/* Glow ring — opacity only */}
                <div
                  className="absolute rounded-full will-change-[opacity]"
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "rgba(163, 55, 52, 0.10)",
                    opacity: index === i ? 1 : 0,
                    transition: "opacity 700ms ease",
                  }}
                />
                {/* Dot — scale + background via opacity layers */}
                <div className="relative" style={{ width: 10, height: 10 }}>
                  {/* Inactive ring (always present) */}
                  <div
                    className="absolute inset-0 rounded-full border-2 will-change-[opacity]"
                    style={{
                      borderColor: "var(--color-border)",
                      opacity: index >= i ? 0 : 1,
                      transition: "opacity 500ms ease",
                    }}
                  />
                  {/* Active dot (fades in) */}
                  <div
                    className="absolute inset-0 rounded-full will-change-[opacity]"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      opacity: index >= i ? 1 : 0,
                      transform: index === i ? "scale(1.15)" : "scale(1)",
                      transition: "opacity 500ms ease, transform 500ms ease",
                    }}
                  />
                </div>
              </div>
              <span
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] mt-1 whitespace-nowrap will-change-[opacity]"
                style={{
                  color: index >= i ? "var(--color-accent)" : "var(--color-muted)",
                  transition: "color 700ms ease",
                }}
              >
                {phase.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
