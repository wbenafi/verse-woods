
export default function NoteBookEffect({ className }: { className?: string }) {
  // Parámetros para los anillos
  const ringCount = 35;
  const ringSpacing = 22;
  const ringRadiusX = 8;
  const ringRadiusY = 10;
  const svgHeight = ringSpacing * ringCount + 10;

  return (
    <svg
      width="36"
      height={svgHeight}
      viewBox={`0 0 36 ${svgHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, background: "transparent", display: "block" }}
      className={className}
    >
      {/* Agujeros del cuaderno */}
      {[...Array(ringCount)].map((_, i) => (
        <ellipse
          key={i + 100}
          cx="18"
          cy={i * ringSpacing + 20}
          rx="6"
          ry="6"
          fill="#fff"
          stroke="#e0e0e0"
          strokeWidth="1.5"
        />
      ))}
      {/* Anillos de espiral (óvalos abiertos) */}
      {[...Array(ringCount)].map((_, i) => (
        <path
          key={i}
          d={`M ${15 - ringRadiusX},${i * ringSpacing + 20} 
            a${ringRadiusX},${ringRadiusY / 3} 1,1 ${ringRadiusX * 2 + 3},0`}
          stroke="#222"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
