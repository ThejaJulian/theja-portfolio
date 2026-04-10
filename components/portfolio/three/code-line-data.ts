/** Deterministic “code line” layout for the laptop screen (no Math.random in render). */
export const SCREEN_LINES: { width: number; y: number; hue: 0 | 1 | 2 }[] = [
  { width: 1.55, y: 0.42, hue: 0 },
  { width: 1.15, y: 0.26, hue: 1 },
  { width: 1.38, y: 0.1, hue: 2 },
  { width: 1.28, y: -0.06, hue: 0 },
  { width: 1.02, y: -0.22, hue: 1 },
  { width: 0.88, y: -0.38, hue: 2 },
  { width: 1.18, y: -0.54, hue: 0 },
]

export const LINE_COLORS = ['#22d3ee', '#2dd4bf', '#94a3b8'] as const
