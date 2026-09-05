export default function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-blue-700 to-amber-500" />
      <h2 className="text-3xl font-bold text-slate-800 sm:text-5xl">{children}</h2>
    </div>
  );
}
