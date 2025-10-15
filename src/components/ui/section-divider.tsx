interface SectionDividerProps {
  color?: string
  flip?: boolean
}

export function SectionDivider({
  color = "var(--kreator-yellow)",
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-30 md:h-38 lg:h-42"
        style={{ color }}
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,100 L0,100 Z"
        ></path>
      </svg>
    </div>
  )
}
