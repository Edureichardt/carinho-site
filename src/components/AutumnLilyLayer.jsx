const leaves = [
  { left: "5%", delay: "0s", duration: "15s", size: 18, color: "#b86c35", drift: "42px" },
  { left: "19%", delay: "4.5s", duration: "18s", size: 14, color: "#d09a5a", drift: "-38px" },
  { left: "36%", delay: "8s", duration: "20s", size: 16, color: "#9a5d32", drift: "55px" },
  { left: "58%", delay: "1.8s", duration: "17s", size: 13, color: "#c98545", drift: "-46px" },
  { left: "76%", delay: "6.8s", duration: "19s", size: 17, color: "#a96535", drift: "35px" },
  { left: "91%", delay: "11s", duration: "21s", size: 14, color: "#d0a164", drift: "-52px" },
];

export default function AutumnLilyLayer() {
  return (
    <div className="autumn-layer" aria-hidden="true">
      {leaves.map((leaf, index) => (
        <span
          key={index}
          className="autumn-leaf"
          style={{
            left: leaf.left,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            width: leaf.size,
            height: leaf.size * 0.72,
            background: leaf.color,
            "--leaf-drift": leaf.drift,
          }}
        />
      ))}
    </div>
  );
}
