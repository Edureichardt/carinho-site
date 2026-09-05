export default function SeasonDecor() {
  const pieces = [
    ["🍂", "8%", "14%", "floatSlow"],
    ["🍁", "88%", "20%", "floatMedium"],
    ["🤍", "15%", "72%", "floatMedium"],
    ["🐾", "84%", "76%", "floatSlow"],
    ["🌿", "53%", "11%", "floatSlow"],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map(([emoji, left, top, animation], index) => (
        <span
          key={index}
          className={`absolute text-3xl opacity-20 ${animation}`}
          style={{ left, top, animationDelay: `${index * 0.7}s` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
