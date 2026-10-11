export default function EquityCurve() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-90"
      >
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#EAD394" stopOpacity="1" />
            <stop offset="100%" stopColor="#EAD394" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M0,480 C120,470 160,420 240,400 C320,380 360,440 440,410 C520,380 560,280 640,250 C720,220 760,300 840,260 C920,220 960,140 1040,110 C1100,88 1150,70 1200,40 L1200,600 L0,600 Z"
          fill="url(#curveFill)"
        />
        <path
          d="M0,480 C120,470 160,420 240,400 C320,380 360,440 440,410 C520,380 560,280 640,250 C720,220 760,300 840,260 C920,220 960,140 1040,110 C1100,88 1150,70 1200,40"
          fill="none"
          stroke="url(#curveStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1400"
          className="animate-drawline"
        />
        <circle cx="1200" cy="40" r="5" fill="#EAD394" className="animate-pulseGlow" />
      </svg>
    </div>
  )
}
