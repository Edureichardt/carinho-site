export default function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      group
      relative
      overflow-hidden

      px-8
      py-4

      rounded-full

      bg-gradient-to-r
      from-rose-500
      to-pink-500

      text-white
      font-semibold

      shadow-xl

      transition-all
      duration-500

      hover:scale-105
      active:scale-95
      "
    >
      <span className="relative z-10">
        Continuar ❤️
      </span>

      <span
        className="
        absolute
        inset-0
        bg-white/20

        -translate-x-full

        group-hover:translate-x-full

        transition-transform
        duration-700
        "
      />
    </button>
  );
}