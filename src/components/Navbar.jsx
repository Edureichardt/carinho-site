import { useState } from "react";
import { unlockSecret } from "../secretSystem";

export default function Navbar() {
  const [taps, setTaps] = useState(0);
  function logoTap() {
    const n = taps + 1;
    setTaps(n);
    if (n >= 8) { unlockSecret("logo-8"); setTaps(0); }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/30 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <button type="button" onClick={logoTap} className="shrink-0 text-sm font-black text-blue-800 sm:text-base" title="ER × MI">ER × MI</button>
        <div className="flex min-w-0 items-center gap-1 text-[11px] font-semibold text-slate-600 sm:gap-4 sm:text-sm">
          <a href="#nosso-tempo" className="rounded-full px-2 py-2 transition hover:bg-blue-50 hover:text-blue-700 sm:px-0">tempo ⏳</a>
          <a href="#lirio" className="rounded-full px-2 py-2 transition hover:bg-amber-50 hover:text-amber-700 sm:px-0">lírio 🌸</a>
          <a href="#galeria" className="rounded-full px-2 py-2 transition hover:bg-blue-50 hover:text-blue-700 sm:px-0">galeria 📷</a>
          <a href="#oito" className="hidden transition hover:text-blue-700 md:block">nosso 8 🤍</a>
        </div>
      </div>
    </nav>
  );
}
