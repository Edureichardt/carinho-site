export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/30 bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="font-bold text-blue-800">ER × MI</a>
        <a href="#oito" className="hidden text-sm font-medium text-slate-600 transition hover:text-blue-700 sm:block">nosso número 8 🤍</a>
      </div>
    </nav>
  );
}
