import LilyIcon from "./LilyIcon";

export default function LilyDivider() {
  return (
    <div className="relative flex items-center justify-center gap-4 overflow-hidden py-7 text-blue-800/60" aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-amber-300/70 to-blue-300 sm:w-28" />
      <LilyIcon className="h-16 w-14 opacity-90" />
      <span className="hidden text-[10px] uppercase tracking-[0.34em] sm:inline">lírios & outono</span>
      <LilyIcon className="h-16 w-14 -scale-x-100 opacity-90" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-amber-300/70 to-blue-300 sm:w-28" />
    </div>
  );
}
