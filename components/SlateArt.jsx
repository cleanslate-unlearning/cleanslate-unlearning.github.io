import "./slate.css";

const W = 220;
const LINES = [
  [[0, 34, 0], [40, 22, 0], [68, 46, 2], [120, 30, 2], [156, 40, 1]],
  [[0, 26, 0], [32, 52, 1], [90, 38, 2], [134, 24, 2], [164, 44, 0]],
  [[0, 44, 2], [50, 30, 2], [86, 20, 1], [112, 48, 2], [166, 30, 0]],
  [[0, 30, 0], [36, 40, 0], [82, 28, 1], [116, 54, 2], [176, 36, 0]],
  [[0, 50, 1], [56, 26, 2], [88, 36, 0], [130, 30, 0]],
];
const SWEEP = 3.2;

export default function SlateArt() {
  return (
    <svg className="slate" viewBox={`-4 -4 ${W + 8} 126`} aria-hidden="true">
      {LINES.map((line, r) =>
        line.map(([x, w, kind]) => (
          <rect
            key={`${r}-${x}`}
            className={kind === 1 ? "w mem" : kind === 2 ? "w near" : "w"}
            x={x}
            y={r * 24}
            width={w}
            height={10}
            rx={2}
            style={{ animationDelay: `${((x + w / 2) / W) * SWEEP}s` }}
          />
        ))
      )}
      <line className="sweep" x1="0" y1="-4" x2="0" y2="110" />
    </svg>
  );
}
