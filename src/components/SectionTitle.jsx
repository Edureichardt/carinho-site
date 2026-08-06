export default function SectionTitle({ children }) {
  return (
    <div className="text-center">

      <div className="w-24 h-1 rounded-full bg-rose-500 mx-auto mb-5"></div>

      <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">
        {children}
      </h2>

    </div>
  );
}