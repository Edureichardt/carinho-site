export default function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-900/15 transition-all duration-500 hover:scale-105 active:scale-95"
    >
      <span className="relative z-10">Ver nossa nova fase 🤍</span>
      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}
